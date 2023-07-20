import RecordForm from './record_form';
import FileForm from '../seismic_analysis/file_form';
import BuildingForm from './building_form';
import FoundationForm from './foundation_form';
import ProjectForm from './project_form';
import SeismicForm from './seismic_form';
import ConstructionFieldForm from './construction_field_form';
import SoilProfileForm from './soil_profile_form';
import * as fv from 'lib/form_validation';

export const fileValidation = (
    fileInput: HTMLInputElement | null,
    recordData: Record<string, any>,
    setErrorModalContent: Function,
): boolean => {
    const fileForm = new FileForm();
    const errorDiv = 'Deprem Parametreleri';

    if (fileInput != null) {
        if (fileInput.files?.length === 0) {
            setErrorModalContent({
                title: errorDiv,
                content: 'Lütfen bir dosya seçiniz',
                show: true,
            });
            return false;
        }
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

function recordFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    const form = new RecordForm(data.giveReport);
    const errorDiv = 'Deprem Parametreleri';
    let errorMessage = '';
    const recordData = data.recordData;

    errorMessage = fv.validateFormset(recordData, form, ['accelerations']);
    if (errorMessage) {
        return { errorDiv, errorMessage };
    }

    for (const rd of recordData) {
        if (rd.accelerations.length === 0) {
            errorMessage = 'Deprem kaydı boş olamaz.';
            return { errorDiv, errorMessage };
        }
    }

    errorMessage = fv.validateFormset(data.recordData, form);

    return { errorDiv, errorMessage };
}

function soilFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Zemin Profili';
    let errorMessage;

    const soilProfile = data.soilProfile;
    const layers = soilProfile.layers;
    const form = new SoilProfileForm(data.giveReport);

    errorMessage = fv.validateFormset(layers, form, [
        'noBaseRock',
        'localSoilClass',
        'baseRockType',
        'baseRockDepth',
        'gwt',
    ]);

    if (errorMessage) {
        return { errorDiv, errorMessage };
    }

    errorMessage = fv.validateField(soilProfile, form.gwt);
    if (errorMessage) {
        return { errorDiv, errorMessage };
    }

    if (!soilProfile.noBaseRock) {
        errorMessage = fv.validateField(soilProfile, form.baseRockDepth);
        if (errorMessage) {
            return { errorDiv, errorMessage };
        }
    }

    return { errorDiv, errorMessage };
}

function projectFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    if (data.giveReport) {
        const form = new ProjectForm();
        const errorDiv = 'Proje Bilgileri';
        const errorMessage = fv.validateForm(data, form);
        return { errorDiv, errorMessage };
    }
    return { errorDiv: '', errorMessage: '' };
}

function seismicFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    if (data.giveReport) {
        const form = new SeismicForm(data.giveReport);
        const errorDiv = 'Deprem Parametreleri';
        const errorMessage = fv.validateForm(data, form);
        return { errorDiv, errorMessage };
    }
    return { errorDiv: '', errorMessage: '' };
}

function constructionFieldFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    if (data.giveReport) {
        const form = new ConstructionFieldForm();
        const errorDiv = 'Saha Bilgileri';
        const errorMessage = fv.validateForm(data, form);
        return { errorDiv, errorMessage };
    }
    return { errorDiv: '', errorMessage: '' };
}
function buildingFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Yapı Bilgileri';
    const form = new BuildingForm(data.giveReport);
    const errorMessage = fv.validateForm(data, form);
    return { errorDiv, errorMessage };
}

function foundationFormValidation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Yapı Bilgileri';
    const form = new FoundationForm(data.giveReport);
    const errorMessage = fv.validateForm(data, form);
    return { errorDiv, errorMessage };
}

export function validation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
    isValid: boolean;
} {
    let isValid = true;
    let errorDiv = '';
    let errorMessage = '';

    const validationFunctions = [
        buildingFormValidation,
        foundationFormValidation,
        projectFormValidation,
        soilFormValidation,
        recordFormValidation,
        constructionFieldFormValidation,
        seismicFormValidation,
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
