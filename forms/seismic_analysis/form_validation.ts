import FileForm from './file_form';
import ProcessForm from './process_form';
import * as fv from 'lib/form_validation';

type modalContentProp = {
    title: string;
    content: string;
    show: boolean;
};
export const fileValidation = (
    recordData: Record<string, any>,
    setErrorModalContent: (content: modalContentProp) => void,
): boolean => {
    const fileForm = new FileForm();
    const errorDiv = '';

    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput?.files?.length === 0) {
        setErrorModalContent({
            title: errorDiv,
            content: 'Lütfen bir dosya seçiniz',
            show: true,
        });
        return false;
    }

    let errorMessage = fv.validateField(recordData, fileForm.firstRowNo);
    if (errorMessage) {
        setErrorModalContent({
            title: errorDiv,
            content: errorMessage,
            show: true,
        });
        return false;
    }
    errorMessage = fv.validateField(recordData, fileForm.lastRowNo);
    if (errorMessage) {
        setErrorModalContent({
            title: errorDiv,
            content: errorMessage,
            show: true,
        });
        return false;
    }
    errorMessage = fv.validateField(recordData, fileForm.timeStep);
    if (errorMessage) {
        setErrorModalContent({
            title: errorDiv,
            content: errorMessage,
            show: true,
        });
        return false;
    }

    return true;
};

export function processFormValidation(
    recordData: Record<string, any>,
    setErrorModalContent: (content: {
        title: string;
        content: string;
        show: boolean;
    }) => void,
): boolean {
    const processForm = new ProcessForm();

    processForm.baselineCorrectionOrder.required =
        recordData.applyBaselineCorrection;
    processForm.filterOrder.required = recordData.applyFiltering;
    processForm.lowCornerFrequency.required =
        recordData.filteringType !== 'highpass';
    processForm.lowCornerFrequency.required =
        recordData.filteringType !== 'lowpass';

    const errorMessage = fv.validateForm(recordData, processForm);
    if (errorMessage) {
        setErrorModalContent({
            title: '',
            content: errorMessage,
            show: true,
        });
        return false;
    }

    return true;
}
