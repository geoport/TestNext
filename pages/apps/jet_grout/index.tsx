import React, { useState, useEffect, useMemo } from 'react';
import * as tab from 'components/elements/Tab';
import { initialState } from 'types/jet_grout/initial_state';
import { promises as fs } from 'fs';
import path from 'path';
import validation from 'forms/jet_grout/form_validation';
import * as btn from 'components/elements/Buttton';
import * as pf from 'lib/project_functions';
import { useSession } from '@supabase/auth-helpers-react';
import DataContext from './context';
import dynamic from 'next/dynamic';
import process from 'process';
import jetGroutHandler from '@/lib/apps/jet_grout/main';
import { OutputData } from 'types/jet_grout/api_types';
import listReportTemplates from '@/lib/apps/get_templates';
import { useRouter } from 'next/dist/client/router';
import CheckUserLoggedIn from '../CheckLoggedIn';

const Preloader = dynamic(
    () => import('../../../components/elements/Preloader'),
);
const ErrorModal = dynamic(
    () => import('../../../components/modals/error_modal'),
);
const SaveProjectModal = dynamic(
    () => import('../../../components/modals/save_project_modal'),
);
const FailedAnalysisModal = dynamic(
    () => import('../../../components/modals/failed_analysis_modal'),
);
const AnalysisTab = dynamic(() => import('./tabs/AnalysisTab'));
const InputTab = dynamic(() => import('./tabs/InputTab'));

function JetGroutPage({ cityList }: { cityList: string[] }) {
    const appName = 'jetGrout';
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const session = useSession();
    const user = session?.user;
    const [isLoggedin, setIsLoggedIn] = useState(false);

    const handleLoggedIn = (isLoggedIn: boolean) => {
        if (isLoggedIn) {
            setIsLoggedIn(true);
            return;
        }
        router.replace('/authentication/login');
    };
    const [output, setOutput] = useState({} as OutputData);
    const [data, setData] = useState(
        JSON.parse(JSON.stringify(initialState.inputData)),
    );
    const [savedProjects, setSavedProjects] = useState([]);
    const [reportTemplates, setReportTemplates] = useState([
        'Varsayılan Şablon',
    ]);
    const [selectedTemplate, setSelectedTemplate] =
        useState('Varsayılan Şablon');
    const [selectedProject, setSelectedProject] = useState('');
    const [showFailedAnalysisModal, setShowFailedAnalysisModal] =
        useState(false);

    const [showReportTab, setShowReportTab] = useState(false);
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

    const handleSubmit = async () => {
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
            const output_ = await jetGroutHandler(
                data,
                user?.id as string,
                selectedTemplate,
                appName,
            );
            setOutput(output_);
            setShowReportTab(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setShowFailedAnalysisModal(true);
        }
    };

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
        await pf.saveProject({
            inputData: data,
            uid: user?.id,
            projectName: projectModalContent.projectName,
            appName: appName,
        });
        setProjectModalContent({ ...projectModalContent, show: false });
        pf.listSavedProjects(
            user,
            appName,
            setSavedProjects,
            setSelectedProject,
        );
        alert('Proje başarıyla kaydedildi');
    };

    const handleLoadProject = async () => {
        const response = await pf.loadProject(
            user?.id as string,
            appName,
            selectedProject,
        );
        const savedData = JSON.parse(response.message);
        setData(savedData.inputData);
        alert('Proje başarıyla yüklendi');
    };

    const contextData = useMemo(() => {
        return {
            data,
            setData,
            output,
        };
    }, [data, setData, output]);

    return (
        <DataContext.Provider value={contextData}>
            <CheckUserLoggedIn onLoggedIn={handleLoggedIn} />
            {!loading && isLoggedin ? (
                <div className="m-5">
                    <tab.TabWrapper defaultIndex={showReportTab ? 2 : 0}>
                        <tab.TabBar>
                            <tab.TabLink title="Analiz Ayarları" />
                            <tab.TabLink title="Veri Girişi" />
                            <tab.TabLink title="Rapor" hide={!showReportTab} />
                        </tab.TabBar>
                        <tab.TabContentWrapper>
                            <tab.TabContent id="analysis-settings">
                                <AnalysisTab
                                    savedProjects={savedProjects}
                                    selectedProject={selectedProject}
                                    setSelectedProject={setSelectedProject}
                                    data={data}
                                    setData={setData}
                                    onLoadProject={handleLoadProject}
                                    setOutput={setOutput}
                                    setShowReportTab={setShowReportTab}
                                    templates={reportTemplates}
                                    selectedTemplate={selectedTemplate}
                                    setSelectedTemplate={setSelectedTemplate}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="project-input">
                                <InputTab cityList={cityList} />
                                <div className="ml-5 mt-5 space-x-3">
                                    <btn.SubmitButton onClick={handleSubmit}>
                                        Analiz Yap
                                    </btn.SubmitButton>
                                    <btn.BorderButton
                                        onClick={showProjectModal}
                                    >
                                        Projeyi Kaydet
                                    </btn.BorderButton>
                                </div>
                            </tab.TabContent>
                        </tab.TabContentWrapper>
                    </tab.TabWrapper>

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
            ) : (
                <Preloader />
            )}
        </DataContext.Provider>
    );
}

export default JetGroutPage;

export async function getStaticProps() {
    const directoryPath = path.join(process.cwd(), 'data', 'location_data');
    const filenames = await fs.readdir(directoryPath);
    const cityList = filenames.map((filename) => {
        return filename.split('.')[0];
    });
    return {
        props: {
            cityList: cityList,
        },
    };
}
