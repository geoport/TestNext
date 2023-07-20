import React, { useState, useEffect, useMemo } from 'react';
import InputTab from './tabs/InputTab';
import * as tab from 'components/elements/Tab';
import * as btn from 'components/elements/Buttton';
import * as pf from 'lib/project_functions';
import SavedProjectsList from 'components/elements/SavedProjectsList';
import { useSession } from '@supabase/auth-helpers-react';
import validation from 'forms/earthquake_selection/form_validation';
import earthquakeSelectionHandler from 'lib/apps/earthquake_selection/main';
import DataContext from './context';
import dynamic from 'next/dynamic';
import { ContextData } from 'types/earthquake_selection/input_types';
import { OutputData } from 'types/earthquake_selection/api_types';
import { initialState } from 'types/earthquake_selection/initial_state';
import CheckUserLoggedIn from '../CheckLoggedIn';
import { useRouter } from 'next/dist/client/router';

const OutputTab = dynamic(() => import('./tabs/OutputTab'));
const Preloader = dynamic(() => import('components/elements/Preloader'));
const ErrorModal = dynamic(() => import('components/modals/error_modal'));
const SaveProjectModal = dynamic(
    () => import('components/modals/save_project_modal'),
);
const FailedAnalysisModal = dynamic(
    () => import('components/modals/failed_analysis_modal'),
);

function EarthquakeSelectionPage(props: {
    appName: string;
    downloadRecordCallback: Function;
}) {
    const router = useRouter();
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const handleLoggedIn = (isLoggedIn: boolean) => {
        if (isLoggedIn) {
            setIsLoggedIn(true);
            return;
        }
        router.replace('/authentication/login');
    };
    const session = useSession();
    const user = session?.user;
    const appName = props.appName;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);
    const [output, setOutput] = useState({} as OutputData);
    const [savedProjects, setSavedProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [showOutputTab, setShowOutputTab] = useState(false);
    const [showFailedAnalysisModal, setShowFailedAnalysisModal] =
        useState(false);
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
            const output_ = await earthquakeSelectionHandler(data, user?.id);
            setOutput(output_);
            setShowOutputTab(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setShowOutputTab(false);
            setOutput({} as OutputData);
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

        await pf.saveProject({
            serializedContext: JSON.stringify(data),
            userId: user.id,
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

    const downloadRecordCallback = props.downloadRecordCallback;
    const isImported = appName !== 'earthquake_selection';
    const contextData: ContextData = useMemo(() => {
        return {
            data,
            setData,
            output,
            handleInputChange,
            downloadRecordCallback,
        };
    }, [data, setData, output, handleInputChange, downloadRecordCallback]);

    return (
        <DataContext.Provider value={contextData}>
            <CheckUserLoggedIn onLoggedIn={handleLoggedIn} />
            <div className="m-5">
                {!loading && isLoggedin ? (
                    <tab.TabWrapper defaultIndex={showOutputTab ? 1 : 0}>
                        <tab.TabBar>
                            <tab.TabLink title="Veri Girişi" />
                            <tab.TabLink title="Sonuç" hide={!showOutputTab} />
                        </tab.TabBar>
                        <tab.TabContentWrapper>
                            <tab.TabContent id="project-input">
                                {!isImported && (
                                    <SavedProjectsList
                                        projects={savedProjects}
                                        selectedProject={selectedProject}
                                        setSelectedProject={setSelectedProject}
                                        onLoadProject={handleLoadProject}
                                    />
                                )}
                                <InputTab />
                                <div className="ml-5 mt-5 space-x-3">
                                    <btn.SubmitButton onClick={handleSubmit}>
                                        Devam Et
                                    </btn.SubmitButton>
                                    {!isImported && (
                                        <btn.BorderButton
                                            onClick={showProjectModal}
                                        >
                                            Projeyi Kaydet
                                        </btn.BorderButton>
                                    )}
                                </div>
                            </tab.TabContent>
                            <tab.TabContent id="output-tab">
                                {showOutputTab && <OutputTab />}
                            </tab.TabContent>
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

EarthquakeSelectionPage.getInitialProps = async () => {
    return {
        appName: 'earthquake_selection',
    };
};

export default EarthquakeSelectionPage;
