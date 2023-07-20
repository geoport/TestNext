import * as btn from 'components/elements/Buttton';
import { useState } from 'react';
import gmpPredictionHandler from 'lib/apps/gmp_prediction/main';
import validation from 'forms/gmp_prediction/form_validation';
import * as types from 'lib/apps/gmp_prediction/types';
import dynamic from 'next/dynamic';
import InputForm from './input_form';

const ErrorModal = dynamic(() => import('components/modals/error_modal'));
const FailedAnalysisModal = dynamic(
    () => import('components/modals/failed_analysis_modal'),
);
const OutputDiv = dynamic(() => import('./output'));

export default function GmpPredictionPage() {
    const [inputData, setData] = useState(types.initialState);
    const [output, setOutput] = useState({} as types.OutputData);
    const [loading, setLoading] = useState(false);
    const [showFailedAnalysisModal, setShowFailedAnalysisModal] =
        useState(false);
    const [errorModalContent, setErrorModalContent] = useState({
        title: '',
        content: '',
        show: false,
    });
    const handleChange = (e: any) => {
        const { id, value } = e.target;

        setData({ ...inputData, [id]: value });
    };

    const handleSubmit = async () => {
        const { errorDiv, errorMessage, isValid } = validation(inputData);
        if (!isValid) {
            setErrorModalContent({
                title: errorDiv,
                content: errorMessage,
                show: true,
            });
            return;
        }

        setOutput({} as types.OutputData);
        try {
            setLoading(true);
            const output = await gmpPredictionHandler(inputData);
            setOutput({ ...output, outputType: inputData.outputType });
        } catch (error) {
            setLoading(false);
            setShowFailedAnalysisModal(true);
        }
        setLoading(false);
    };

    return (
        <div className="container min-h-screen text-center">
            <h2 className="mt-10 mb-10 text-2xl">
                <b>AI Yer Hareketi Parametresi Tahmini</b>
            </h2>
            <InputForm inputData={inputData} handleChange={handleChange} />
            <btn.BorderButton onClick={handleSubmit}>Hesapla</btn.BorderButton>
            {loading && (
                <div className="mt-20 text-lg font-bold">Hesaplanıyor...</div>
            )}
            {Object.keys(output).length > 0 && <OutputDiv output={output} />}
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
    );
}
