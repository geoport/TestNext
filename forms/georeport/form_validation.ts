import * as fv from 'lib/form_validation';
import * as analysisForms from './analysis_options_form';
import FoundationForm from './foundation_form';
import LoadingForm from './loading_form';
import getRequiredFields, {
    getSoilProfileRequirements,
} from 'lib/apps/georeport/get_required_fields';
import SeismicForm from './seismic_form';
import CptForm from './cpt_form';
import MaswForm from './masw_form';
import PressuremeterForm from './pressuremeter_form';
import SptForm from './spt_form';
import SoilProfileForm from './soil_profile_form';
import { AnalysisOptions, InputData } from 'types/georeport/input_types';
import { RequiredFields } from 'lib/apps/georeport/get_required_fields';

function analysisFormValidation(analysisOptions: AnalysisOptions): {
    errorDiv: string;
    errorMessage: string;
} {
    let errorMessage = '';
    const errorDiv = 'Analiz Ayarları';

    const analysisOptionsForm = new analysisForms.AnalysisOptionsForm();
    const bearingCapacityForm = new analysisForms.BearingCapacityForm();

    const formDict = {
        settlementAnalysis: new analysisForms.SettlementForm(),
        localSoilClassAnalysis: new analysisForms.LocalSoilClassForm(),
        liquefactionAnalysis: new analysisForms.LiquefactionForm(),
        soilCoefficientAnalysis: new analysisForms.SoilCoefficientForm(),
    };

    errorMessage = fv.checkAny(analysisOptions, analysisOptionsForm);

    if (errorMessage) return { errorDiv, errorMessage };

    if (analysisOptions.bearingCapacityAnalysis) {
        errorMessage = fv.checkAny(analysisOptions, bearingCapacityForm);
        if (errorMessage) return { errorDiv, errorMessage };
        if (
            !analysisOptions.bearingCapacityShortTerm &&
            !analysisOptions.bearingCapacityLongTerm
        ) {
            errorMessage =
                'Uzun dönem yada kısa dönem taşıma kapasitesinden en az birini seçmelisiniz.';
            return { errorDiv, errorMessage };
        }
    }
    for (const analysis of Object.keys(formDict)) {
        if (
            analysisOptions[analysis as keyof AnalysisOptions] &&
            analysis in formDict
        ) {
            errorMessage = fv.checkAny(
                analysisOptions,
                formDict[analysis as keyof typeof formDict],
            );
            if (errorMessage) return { errorDiv, errorMessage };
        }
    }

    return { errorDiv, errorMessage };
}

function foundationFormValidation(
    data: InputData,
    _: any,
    requirements: RequiredFields,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Temel Bilgileri';
    let errorMessage = '';
    const form = new FoundationForm(requirements.foundationFormRequirements);
    errorMessage = fv.validateForm(data.foundationData, form);

    return { errorDiv, errorMessage };
}

function loadingFormValidation(
    data: InputData,
    _: any,
    requirements: RequiredFields,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Yük Bilgileri';
    let errorMessage = '';
    const form = new LoadingForm(requirements.loadingFormRequirements);
    errorMessage = fv.validateForm(data.loadingData, form);

    return { errorDiv, errorMessage };
}

function seismicFormValidation(
    data: InputData,
    _: any,
    requirements: RequiredFields,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Deprem Parametreleri';
    let errorMessage = '';
    const form = new SeismicForm(requirements.seismicFormRequirements);
    errorMessage = fv.validateForm(data.seismicData, form);

    return { errorDiv, errorMessage };
}

function cptFormValidation(
    data: InputData,
    analysisOptions: AnalysisOptions,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Mevcut Zemin Araştırmaları(CPT Verileri)';
    let errorMessage = '';

    const form = new CptForm(analysisOptions);

    if (form.isRequired) {
        errorMessage = fv.validateFormset(
            data.siteInvestigationData.cptData,
            form,
        );
    }

    return { errorDiv, errorMessage };
}

function maswFormValidation(
    data: InputData,
    analysisOptions: AnalysisOptions,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Mevcut Zemin Araştırmaları(MASW Verileri)';
    let errorMessage = '';

    const form = new MaswForm(analysisOptions);

    if (form.isRequired) {
        errorMessage = fv.validateFormset(
            data.siteInvestigationData.maswData,
            form,
        );
    }

    return { errorDiv, errorMessage };
}

function pressuremeterFormValidation(
    data: InputData,
    analysisOptions: AnalysisOptions,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Mevcut Zemin Araştırmaları(Presiyometre Verileri)';
    let errorMessage = '';

    const form = new PressuremeterForm(analysisOptions);
    if (form.isRequired) {
        errorMessage = fv.validateFormset(
            data.siteInvestigationData.pressuremeterData,
            form,
        );
    }

    return { errorDiv, errorMessage };
}

function sptFormValidation(
    data: InputData,
    analysisOptions: AnalysisOptions,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Mevcut Zemin Araştırmaları(SPT Verileri)';
    let errorMessage = '';

    const form = new SptForm(analysisOptions);
    if (form.isRequired) {
        errorMessage = fv.validateFormset(
            data.siteInvestigationData.sptData.log,
            form,
            [
                'energyCorrectionFactor',
                'diameterCorrectionFactor',
                'samplerCorrectionFactor',
            ],
        );
        if (errorMessage) return { errorDiv, errorMessage };
    }
    errorMessage = fv.validateForm(data.siteInvestigationData.sptData, form, [
        'depth',
        'N',
    ]);

    return { errorDiv, errorMessage };
}

function soilFormValidation(
    data: InputData,
    analysisOptions: AnalysisOptions,
): { errorDiv: string; errorMessage: string } {
    const errorDiv = 'Zemin Profili';
    let errorMessage = '';

    const soilProfile = data.soilProfile;
    const layers = soilProfile.layers;
    const noGwt = soilProfile.noGWT;
    const gwt = (soilProfile.gwt as number) || 100;

    if (!noGwt && gwt <= 0) {
        errorMessage = `Yeraltı su seviyesi 0'dan büyük olmalıdır.`;
        return { errorDiv, errorMessage };
    }
    for (const layer of layers) {
        const requiredFields = getSoilProfileRequirements(
            analysisOptions,
            layer,
        );
        const form = new SoilProfileForm(requiredFields);
        errorMessage = fv.validateForm(layer, form, [
            'noGwt',
            'gwt',
            'checkThickClayLayer',
            'checkHighPlasticityClayContent',
            'checkSoftClayContent',
            'checkSensitiveClayContent',
            'extendSoilProfile',
        ]);
        if (errorMessage) return { errorDiv, errorMessage };
    }

    return { errorDiv, errorMessage };
}

export default function validation(
    data: InputData,
    analysisOptions: AnalysisOptions,
): { errorDiv: string; errorMessage: string; isValid: boolean } {
    let isValid = true;

    let { errorDiv, errorMessage } = analysisFormValidation(analysisOptions);

    if (errorMessage) {
        isValid = false;
        return { errorDiv, errorMessage, isValid };
    }

    const requirements = getRequiredFields(analysisOptions);

    const validationFunctions = [
        soilFormValidation,
        sptFormValidation,
        pressuremeterFormValidation,
        maswFormValidation,
        cptFormValidation,
        seismicFormValidation,
        loadingFormValidation,
        foundationFormValidation,
    ];

    for (const validationFunction of validationFunctions) {
        ({ errorDiv, errorMessage } = validationFunction(
            data,
            analysisOptions,
            requirements,
        ));
        if (errorMessage) {
            isValid = false;
            return { errorDiv, errorMessage, isValid };
        }
    }

    return { errorDiv, errorMessage, isValid };
}
