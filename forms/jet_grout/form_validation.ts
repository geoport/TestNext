import * as fv from 'lib/form_validation';
import FoundationForm from './foundation_form';
import LoadingForm from './loading_form';
import ProjectForm from '../project_form';
import SeismicForm from './seismic_form';
import SptForm from './spt_form';
import SoilProfileForm from './soil_profile_form';
import { AnalysisOptions, InputData } from 'types/jet_grout/input_types';

function projectFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Temel Bilgileri';
    let errorMessage = '';
    const form = new ProjectForm();
    errorMessage = fv.validateForm(data.foundationData, form);

    return { errorDiv, errorMessage };
}

function foundationFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Temel Bilgileri';
    let errorMessage = '';
    const form = new FoundationForm(data.analysisOptions);
    errorMessage = fv.validateForm(data.foundationData, form);

    return { errorDiv, errorMessage };
}

function loadingFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Yük Bilgileri';
    let errorMessage = '';
    const form = new LoadingForm(data.analysisOptions);
    errorMessage = fv.validateForm(data.loadingData, form);

    return { errorDiv, errorMessage };
}

function seismicFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Deprem Parametreleri';
    let errorMessage = '';
    const form = new SeismicForm();
    errorMessage = fv.validateForm(data.seismicData, form);

    return { errorDiv, errorMessage };
}

function sptFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Mevcut Zemin Araştırmaları(SPT Verileri)';
    let errorMessage = '';

    const form = new SptForm();
    if (form.isRequired) {
        errorMessage = fv.validateFormset(data.sptLog.log, form, [
            'energyCorrectionFactor',
            'diameterCorrectionFactor',
            'samplerCorrectionFactor',
        ]);
        if (errorMessage) return { errorDiv, errorMessage };
    }
    errorMessage = fv.validateForm(data.sptLog, form, ['depth', 'N']);

    return { errorDiv, errorMessage };
}

function soilFormValidation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
} {
    const errorDiv = 'Zemin Profili';
    let errorMessage = '';

    const soilProfile = data.soilData;
    const layers = soilProfile.layers;
    const noGwt = soilProfile.noGWT;
    const gwt = (soilProfile.gwt as number) || 100;

    if (!noGwt && gwt <= 0) {
        errorMessage = `Yeraltı su seviyesi 0'dan büyük olmalıdır.`;
        return { errorDiv, errorMessage };
    }
    for (const layer of layers) {
        const form = new SoilProfileForm(data.analysisOptions);
        errorMessage = fv.validateForm(layer, form, ['noGwt', 'gwt']);
        if (errorMessage) return { errorDiv, errorMessage };
    }

    return { errorDiv, errorMessage };
}

export default function validation(data: InputData): {
    errorDiv: string;
    errorMessage: string;
    isValid: boolean;
} {
    let isValid = true;

    let { errorDiv, errorMessage } = projectFormValidation(data);

    if (errorMessage) {
        isValid = false;
        return { errorDiv, errorMessage, isValid };
    }

    const validationFunctions = [
        soilFormValidation,
        sptFormValidation,
        seismicFormValidation,
        loadingFormValidation,
        foundationFormValidation,
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
