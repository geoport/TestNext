import React, { useState, useEffect, useMemo } from 'react';
import * as tab from 'components/elements/Tab';
import * as button from 'components/elements/Buttton';
import * as pf from 'lib/project_functions';
import SavedProjectsList from 'components/elements/SavedProjectsList';
import { useSession } from '@supabase/auth-helpers-react';
import InputTab from './tabs/InputTab';
import DataContext from './context';
import { validation } from 'forms/ground_response_analysis/form_validation';
import dynamic from 'next/dynamic';
import graHandler from 'lib/apps/ground_response_analysis/main';
import * as types from 'types/ground_response_analysis/input_types';
import { OutputData } from 'types/ground_response_analysis/api_types';
import listReportTemplates from '@/lib/apps/get_templates';
import { useRouter } from 'next/dist/client/router';
import CheckUserLoggedIn from '../CheckLoggedIn';
import { initialState } from 'types/ground_response_analysis/initial_state';

const Preloader = dynamic(() => import('components/elements/Preloader'));
const ErrorModal = dynamic(() => import('components/modals/error_modal'));
const SaveProjectModal = dynamic(
    () => import('components/modals/save_project_modal'),
);
const FailedAnalysisModal = dynamic(
    () => import('components/modals/failed_analysis_modal'),
);
const ResponseSpectraTab = dynamic(() => import('./tabs/ResponseSpectraTab'));
const TimeSeriesTab = dynamic(() => import('./tabs/TimeSeriesTab'));
const ProfileTab = dynamic(() => import('./tabs/ProfileTab'));
const ReportTab = dynamic(() => import('./tabs/ReportTab'));

function GRAPage() {
    const router = useRouter();
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const handleLoggedIn = (isLoggedIn: boolean) => {
        if (isLoggedIn) {
            setIsLoggedIn(true);
            return;
        }
        router.replace('/authentication/login');
    };
    const appName = 'groundResponseAnalysis';
    const session = useSession();
    const user = session?.user;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState as types.InputData);
    const [output, setOutput] = useState({ reportUrl: '' } as OutputData);
    const [savedProjects, setSavedProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [showOutputTab, setShowOutputTab] = useState(false);
    const [showFailedAnalysisModal, setShowFailedAnalysisModal] =
        useState(false);
    const [reportTemplates, setReportTemplates] = useState([
        'Varsayılan Şablon',
    ]);
    const [selectedTemplate, setSelectedTemplate] =
        useState('Varsayılan Şablon');

    const [errorModalContent, setErrorModalContent] = useState({
        title: '',
        content: '',
        show: false,
    });
    const [projectModalContent, setProjectModalContent] = useState({
        projectName: '',
        errorMessage: '',
        show: false,
    });

    useEffect(() => {
        pf.listSavedProjects(
            user,
            appName,
            setSavedProjects,
            setSelectedProject,
        );
        listReportTemplates(user, appName, setReportTemplates);
    }, [session]);

    async function handleSubmit() {
        const { errorDiv, errorMessage, isValid } = validation(data);

        if (!isValid) {
            setErrorModalContent({
                title: errorDiv,
                content: errorMessage,
                show: true,
            });
            return;
        }
        setLoading(true);
        try {
            const output_ = await graHandler(
                data,
                selectedTemplate,
                user?.id as string,
            );
            setOutput(output_);
            setShowOutputTab(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setShowFailedAnalysisModal(true);
        }
    }

    const showProjectModal = () => {
        setProjectModalContent({ ...projectModalContent, show: true });
    };

    const handleSaveProject = async () => {
        const projectName = projectModalContent.projectName;
        const errorMessage = pf.validateProjectName(projectName);
        if (errorMessage) {
            setProjectModalContent({
                ...projectModalContent,
                errorMessage: errorMessage,
            });
            return;
        }
        if (!user) return;

        const response = await pf.saveProject({
            serializedContext: JSON.stringify(data),
            userId: user.id,
            projectName: projectModalContent.projectName,
            appName: appName,
        });
        const status = JSON.parse(response.message).status;
        if (status === 200) {
            pf.listSavedProjects(
                user,
                appName,
                setSavedProjects,
                setSelectedProject,
            );
            alert('Proje başarıyla kaydedildi');
        } else {
            alert('Proje kaydedilirken bir hata oluştu');
        }
        setProjectModalContent({ ...projectModalContent, show: false });
    };

    const handleLoadProject = async () => {
        if (!user) return;
        const response = await pf.loadProject(
            user.id,
            appName,
            selectedProject,
        );
        const savedData = response.message;
        setData(JSON.parse(savedData.inputData));
        alert('Proje başarıyla yüklendi');
    };

    const handleInputChange = (e: any, dataType: string) => {
        const { id, name, value, checked } = e.target;
        if (dataType === 'boolean') {
            setData({ ...data, [id]: checked });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const contextData: types.ContextData = useMemo(() => {
        return {
            data,
            setData,
            output,
            setOutput,
            showFailedAnalysisModal,
            setShowFailedAnalysisModal,
            errorModalContent,
            setErrorModalContent,
            handleInputChange,
        };
    }, [
        data,
        setData,
        output,
        setOutput,
        showFailedAnalysisModal,
        setShowFailedAnalysisModal,
        errorModalContent,
        setErrorModalContent,
        handleInputChange,
    ]);
    return (
        <DataContext.Provider value={contextData}>
            <CheckUserLoggedIn onLoggedIn={handleLoggedIn} />
            <div className="m-5">
                {!loading && isLoggedin ? (
                    <tab.TabWrapper defaultIndex={showOutputTab ? 1 : 0}>
                        <tab.TabBar>
                            <tab.TabLink title="Veri Girişi" />
                            <tab.TabLink
                                title="Zaman Serileri"
                                hide={!showOutputTab}
                            />
                            <tab.TabLink
                                title="Tepki Spektrumları"
                                hide={!showOutputTab}
                            />
                            <tab.TabLink
                                title="Zemin Profili Grafikleri"
                                hide={!showOutputTab}
                            />
                            <tab.TabLink
                                title="Rapor"
                                hide={output.reportUrl === ''}
                            />
                        </tab.TabBar>
                        <tab.TabContentWrapper>
                            <tab.TabContent id="input-tab">
                                <SavedProjectsList
                                    projects={savedProjects}
                                    selectedProject={selectedProject}
                                    setSelectedProject={setSelectedProject}
                                    onLoadProject={handleLoadProject}
                                />
                                <InputTab
                                    templates={reportTemplates}
                                    selectedTemplate={selectedTemplate}
                                    setSelectedTemplate={setSelectedTemplate}
                                />
                                <div className="ml-5 mt-5 space-x-3">
                                    <button.SubmitButton onClick={handleSubmit}>
                                        Analiz Yap
                                    </button.SubmitButton>
                                    <button.BorderButton
                                        onClick={showProjectModal}
                                    >
                                        Projeyi Kaydet
                                    </button.BorderButton>
                                </div>
                            </tab.TabContent>
                            {showOutputTab && (
                                <>
                                    <tab.TabContent id="response-spectra-tab">
                                        <ResponseSpectraTab />
                                    </tab.TabContent>
                                    <tab.TabContent id="time-series-tab">
                                        <TimeSeriesTab />
                                    </tab.TabContent>
                                    <tab.TabContent id="profile-tab">
                                        <ProfileTab />
                                    </tab.TabContent>
                                    {data.giveReport && (
                                        <tab.TabContent id="report-tab">
                                            <ReportTab
                                                reportUrl={output.reportUrl}
                                            />
                                        </tab.TabContent>
                                    )}
                                </>
                            )}
                        </tab.TabContentWrapper>
                    </tab.TabWrapper>
                ) : (
                    <Preloader />
                )}
                {errorModalContent.show && (
                    <ErrorModal
                        modalContent={errorModalContent}
                        setModalContent={setErrorModalContent}
                    />
                )}
                {showFailedAnalysisModal && (
                    <FailedAnalysisModal
                        setModalContent={setShowFailedAnalysisModal}
                        showModal={showFailedAnalysisModal}
                    />
                )}
                {projectModalContent.show && (
                    <SaveProjectModal
                        modalContent={projectModalContent}
                        setModalContent={setProjectModalContent}
                        onSave={handleSaveProject}
                    />
                )}
            </div>
        </DataContext.Provider>
    );
}

export default GRAPage;
