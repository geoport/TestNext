import React, { useState, useEffect, useMemo } from 'react';
import * as tab from 'components/elements/Tab';
import { initialState } from 'types/georeport/initial_state';
import { promises as fs } from 'fs';
import path from 'path';
import validation from 'forms/georeport/form_validation';
import * as btn from 'components/elements/Buttton';
import * as pf from 'lib/project_functions';
import { useSession } from '@supabase/auth-helpers-react';
import DataContext from './context';
import dynamic from 'next/dynamic';
import process from 'process';
import georeportHandler from '@/lib/apps/georeport/main';
import { GoPrimeResponse } from 'types/georeport/api_types';
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
const ReportTab = dynamic(() => import('./tabs/ReportTab'));

function GeoreportPage({ cityList }: { cityList: string[] }) {
    const appName = 'georeport';
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
    const [output, setOutput] = useState({} as GoPrimeResponse);
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
    const [analysisOptions, setAnalysisOptions] = useState(
        initialState.analysisOptions,
    );
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
        const { errorDiv, errorMessage, isValid } = validation(
            data,
            analysisOptions,
        );

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
            const output_ = await georeportHandler(
                data,
                analysisOptions,
                user?.id,
                selectedTemplate,
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
        data['analysisOptions'] = analysisOptions;
        await pf.saveProject({
            serializedContext: JSON.stringify(data),
            userId: user?.id,
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
        const savedData = response.message;
        const inputData = JSON.parse(savedData.inputData);
        const analysisOptions = inputData.analysisOptions;
        delete inputData.analysisOptions;
        setData(inputData);
        setAnalysisOptions(analysisOptions);
        alert('Proje başarıyla yüklendi');
    };

    const contextData = useMemo(() => {
        return {
            data,
            setData,
            analysisOptions,
            output,
        };
    }, [data, setData, analysisOptions, output]);

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
                                    analysisOptions={analysisOptions}
                                    setAnalysisOptions={setAnalysisOptions}
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
                            <tab.TabContent id="report-tab">
                                {showReportTab && <ReportTab />}
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

export default GeoreportPage;

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
