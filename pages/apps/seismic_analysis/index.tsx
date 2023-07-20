import React, { useState, useMemo } from 'react';
import FileTab from './tabs/FileTab';
import * as tab from 'components/elements/Tab';
import * as btn from 'components/elements/Buttton';
import DataContext from './context';
import * as fv from 'forms/seismic_analysis/form_validation';
import seismicAnalysisHandler from 'lib/apps/seismic_analysis/main';
import { readFile } from 'lib/helper';
import dynamic from 'next/dynamic';
import * as types from 'types/seismic_analysis/input_types';
import { OutputData } from 'types/seismic_analysis/api_types';
import { initialState } from 'types/seismic_analysis/initial_state';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/dist/client/router';
import CheckUserLoggedIn from '../CheckLoggedIn';

const TimeSeriesTab = dynamic(() => import('./tabs/TimeSeriesTab'));
const FourierSpectraTab = dynamic(() => import('./tabs/FourierSpectraTab'));
const ResponseSpectraTab = dynamic(() => import('./tabs/ResponseSpectraTab'));
const GMPTab = dynamic(() => import('./tabs/GMPTab'));
const Preloader = dynamic(() => import('components/elements/Preloader'));
const ErrorModal = dynamic(() => import('components/modals/error_modal'));
const FailedAnalysisModal = dynamic(
    () => import('components/modals/failed_analysis_modal'),
);

export default function SeismicAnalysisPage() {
    const router = useRouter();
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const handleLoggedIn = (isLoggedIn: boolean) => {
        if (isLoggedIn) {
            setIsLoggedIn(true);
            return;
        }
        router.replace('/authentication/login');
    };
    const user = useSession()?.user;
    const [loading, setLoading] = useState(false);
    const [inputData, setData] = useState(initialState);
    const [rawOutput, setRawOutput] = useState({} as OutputData);
    const [processedOutput, setProcessedOutput] = useState({} as OutputData);
    const [showOutputTab, setShowOutputTab] = useState(false);
    const [showFailedAnalysisModal, setShowFailedAnalysisModal] =
        useState(false);
    const [errorModalContent, setErrorModalContent] = useState({
        title: '',
        content: '',
        show: false,
    });

    async function handleSubmit() {
        const isValid = fv.fileValidation(inputData, setErrorModalContent);
        if (!isValid) return;
        const input = document.getElementById(`file`) as HTMLInputElement;
        const file = input.files?.[0] as File;
        const data = await readFile(file);
        const inputData_ = { ...inputData, data };
        setData(inputData_);
        setLoading(true);

        try {
            const output = await seismicAnalysisHandler(
                inputData_,
                user?.id as string,
            );
            setRawOutput(output);
            setProcessedOutput({} as OutputData);
            setShowOutputTab(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setShowFailedAnalysisModal(true);
        }

        setLoading(false);
    }

    async function handlePreprocess() {
        const isValid = fv.processFormValidation(
            inputData,
            setErrorModalContent,
        );
        if (!isValid) return;

        setLoading(true);

        try {
            inputData.data = rawOutput.timeHistory.accelerations;
            const output = await seismicAnalysisHandler(
                inputData,
                user?.id as string,
            );
            setProcessedOutput(output);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setShowFailedAnalysisModal(true);
        }
    }

    const handleInputChange = (e: any, dataType: string) => {
        const { id, name, value, checked } = e.target;

        if (dataType === 'boolean') {
            setData({ ...inputData, [id]: checked });
        } else {
            setData({ ...inputData, [name]: value });
        }
    };

    const contextData: types.ContextData = useMemo(() => {
        return {
            inputData,
            setData,
            rawOutput,
            processedOutput,
            handleInputChange,
        };
    }, [inputData, setData, rawOutput, processedOutput, handleInputChange]);

    return (
        <DataContext.Provider value={contextData}>
            <CheckUserLoggedIn onLoggedIn={handleLoggedIn} />

            <div className="m-5">
                {!loading && isLoggedin ? (
                    <tab.TabWrapper defaultIndex={showOutputTab ? 1 : 0}>
                        <tab.TabBar>
                            <tab.TabLink title="Veri Girişi" />
                            <tab.TabLink
                                title="Veri İşleme"
                                hide={!showOutputTab}
                            />
                            <tab.TabLink
                                title="Fourier ve Güç Spektrumları"
                                hide={!showOutputTab}
                            />
                            <tab.TabLink
                                title="Tepki Spektrumları"
                                hide={!showOutputTab}
                            />
                            <tab.TabLink
                                title="Yer Hareketi Parametreleri"
                                hide={!showOutputTab}
                            />
                        </tab.TabBar>
                        <tab.TabContentWrapper>
                            <tab.TabContent id="file-input">
                                <FileTab />
                                <div className="ml-5 mt-5 space-x-3">
                                    <btn.SubmitButton onClick={handleSubmit}>
                                        Analiz Yap
                                    </btn.SubmitButton>
                                </div>
                            </tab.TabContent>
                            <tab.TabContent id="time-series-tab">
                                {showOutputTab && (
                                    <TimeSeriesTab
                                        handlePreprocess={handlePreprocess}
                                    />
                                )}
                            </tab.TabContent>
                            <tab.TabContent id="fourier-tab">
                                {showOutputTab && <FourierSpectraTab />}
                            </tab.TabContent>
                            <tab.TabContent id="response-tab">
                                {showOutputTab && <ResponseSpectraTab />}
                            </tab.TabContent>
                            <tab.TabContent id="gmp-tab">
                                {showOutputTab && <GMPTab />}
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
            </div>
        </DataContext.Provider>
    );
}
