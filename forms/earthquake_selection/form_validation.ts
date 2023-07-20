import FilteringForm from './filtering_form';
import SpectraForm from './spectra_form';
import { validateForm } from 'lib/form_validation';

const isBigger = (val1: string, val2: string) =>
    parseFloat(val1) > parseFloat(val2);

type InputData = Record<string, any>;

function filteringFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const form = new FilteringForm();
    const errorDiv = 'Ön Filtreleme Parametreleri';
    let errorMessage = null;

    errorMessage = validateForm(data, form);
    if (errorMessage) {
        return { errorDiv, errorMessage };
    }

    if (isBigger(data.minMw, data.maxMw)) {
        errorMessage =
            'Minimum deprem büyüklüğü maksimum deprem büyüklüğünden büyük olamaz.';
        return { errorDiv, errorMessage };
    }
    if (isBigger(data.minPga, data.maxPga)) {
        errorMessage = "Minimum PGA maksimum PGA'dan büyük olamaz.";
        return { errorDiv, errorMessage };
    }

    if (isBigger(data.minAI, data.maxAI)) {
        errorMessage =
            'Minimum Arias Yoğunluğu maksimum Arias Yoğunluğundan büyük olamaz.';
        return { errorDiv, errorMessage };
    }

    if (isBigger(data.minRrup, data.maxRrup)) {
        errorMessage =
            'Minimum Fay Uzaklığı maksimum Fay Uzaklığından büyük olamaz';
        return { errorDiv, errorMessage };
    }

    if (isBigger(data.minVS30, data.maxVS30)) {
        errorMessage = "Minimum VS30 maksimum VS30'dan büyük olamaz.";
        return { errorDiv, errorMessage };
    }

    if (isBigger(data.minYear, data.maxYear)) {
        errorMessage =
            'Minimum Deprem Yılı maksimum Deprem Yılından büyük olamaz.';
        return { errorDiv, errorMessage };
    }

    if (data.faultTypes.length === 0) {
        errorMessage = 'En az bir fay tipi seçilmelidir.';
        return { errorDiv, errorMessage };
    }

    return { errorDiv, errorMessage };
}

function spectraFormValidation(data: InputData) {
    const form = new SpectraForm();
    const errorDiv = 'Seçim Parametreleri';
    let errorMessage = null;

    if (data.allowScaling) {
        form.minScaleFactor.required = true;
        form.maxScaleFactor.required = true;
        form.minScalingPeriod.required = true;
        form.maxScalingPeriod.required = true;
    }

    errorMessage = validateForm(data, form);
    if (errorMessage) {
        return { errorDiv, errorMessage };
    }

    if (data.minSelectionPeriod >= data.maxSelectionPeriod) {
        errorMessage = 'Başlangıç periyodu bitiş periyodundan küçük olmalıdır.';
        return { errorDiv, errorMessage };
    }

    if (data.allowScaling) {
        if (isBigger(data.minScaleFactor, data.maxScaleFactor)) {
            errorMessage =
                'Minimum ölçek faktörü maksimum ölçek faktöründen büyük olamaz.';
            return { errorDiv, errorMessage };
        }

        if (
            parseFloat(data.minScalingPeriod) >=
            parseFloat(data.maxScalingPeriod)
        ) {
            errorMessage =
                'Minimum ölçekleme periyodu maksimum ölçekleme periyodundan büyük olamaz.';
            return { errorDiv, errorMessage };
        }
    }

    return { errorDiv, errorMessage };
}

export default function validation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
    isValid: boolean;
} {
    let isValid = true;
    let errorDiv = '';
    let errorMessage = '';

    const validationFunctions = [
        filteringFormValidation,
        spectraFormValidation,
    ];

    for (const validationFunction of validationFunctions) {
        ({ errorDiv, errorMessage } = validationFunction(data));
        if (errorMessage) {
            isValid = false;
            return { errorDiv, errorMessage, isValid };
        }
    }

    return { errorDiv, errorMessage, isValid };
}
