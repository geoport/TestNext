import { AnalysisOptions } from 'types/georeport/input_types';
import { SoilLayerData } from 'types/soil_profile';

export default function getRequiredFields(
    analysisOptions: AnalysisOptions,
): RequiredFields {
    const foundationFormRequirements =
        getFoundationFormRequirements(analysisOptions);

    const loadingFormRequirements = getLoadingFormRequirements(analysisOptions);
    const seismicFormRequirements = getSeismicFormRequirements(analysisOptions);
    return {
        foundationFormRequirements,
        loadingFormRequirements,
        seismicFormRequirements,
    };
}

function getFoundationFormRequirements(
    analysisOptions: AnalysisOptions,
): FoundationFormRequirements {
    const bearingCapacityAnalysis = analysisOptions.bearingCapacityAnalysis;
    const bearingCapacityByVesic = analysisOptions.bearingCapacityByVesic;
    const horizontalSlidingAnalysis = analysisOptions.horizontalSlidingAnalysis;
    const swellingPotentialAnalysis = analysisOptions.swellingPotentialAnalysis;
    const effectiveDepthAnalysis = analysisOptions.effectiveDepthAnalysis;
    const settlementAnalysis = analysisOptions.settlementAnalysis;
    const soilCoefficientAnalysis = analysisOptions.soilCoefficientAnalysis;

    const isRequired =
        bearingCapacityAnalysis ||
        horizontalSlidingAnalysis ||
        swellingPotentialAnalysis ||
        effectiveDepthAnalysis ||
        settlementAnalysis ||
        soilCoefficientAnalysis;

    return {
        foundationBaseAngle: bearingCapacityAnalysis && bearingCapacityByVesic,
        slopeAngle: bearingCapacityAnalysis && bearingCapacityByVesic,
        foundationWidth: isRequired,
        foundationLength: isRequired,
        foundationDepth: isRequired,
    };
}

function getLoadingFormRequirements(
    analysisOptions: AnalysisOptions,
): LoadingFormRequirements {
    const bearingCapacityAnalysis = analysisOptions.bearingCapacityAnalysis;
    const bearingCapacityByVesic = analysisOptions.bearingCapacityByVesic;
    const horizontalSlidingAnalysis = analysisOptions.horizontalSlidingAnalysis;
    const swellingPotentialAnalysis = analysisOptions.swellingPotentialAnalysis;
    const effectiveDepthAnalysis = analysisOptions.effectiveDepthAnalysis;
    const settlementAnalysis = analysisOptions.settlementAnalysis;
    const soilCoefficientAnalysis = analysisOptions.soilCoefficientAnalysis;

    const isVerticalLoadsRequired =
        bearingCapacityAnalysis ||
        horizontalSlidingAnalysis ||
        swellingPotentialAnalysis ||
        effectiveDepthAnalysis ||
        settlementAnalysis ||
        soilCoefficientAnalysis;

    const isHorizontalLoadsRequired =
        (bearingCapacityAnalysis && bearingCapacityByVesic) ||
        horizontalSlidingAnalysis;

    return {
        horizontalLoadX: isHorizontalLoadsRequired,
        horizontalLoadY: isHorizontalLoadsRequired,
        loadingCase1Min: isVerticalLoadsRequired,
        loadingCase2Min: isVerticalLoadsRequired,
        loadingCase3Min: isVerticalLoadsRequired,
        loadingCase1Avg: isVerticalLoadsRequired,
        loadingCase2Avg: isVerticalLoadsRequired,
        loadingCase3Avg: isVerticalLoadsRequired,
        loadingCase1Max: isVerticalLoadsRequired,
        loadingCase2Max: isVerticalLoadsRequired,
        loadingCase3Max: isVerticalLoadsRequired,
    };
}

function getSeismicFormRequirements(
    analysisOptions: AnalysisOptions,
): SeismicFormRequirements {
    const designSpectrumAnalysis = analysisOptions.designSpectrumAnalysis;
    const liquefactionAnalysis = analysisOptions.liquefactionAnalysis;

    return {
        earthquakeMagnitude: liquefactionAnalysis,
        SS: liquefactionAnalysis || designSpectrumAnalysis,
        S1: designSpectrumAnalysis,
    };
}

export const getSoilProfileRequirements = (
    analysisOptions: AnalysisOptions,
    layerData: SoilLayerData,
): SoilProfileRequirements => {
    const showSoilClassTextBox =
        analysisOptions.idealizedSoilPage && layerData.soilClass === 'Diğer';

    const showPreconsolidationParams =
        analysisOptions.settlementAnalysis &&
        analysisOptions.consolidationSettlementAnalysis &&
        analysisOptions.consolidationSettlementMethod === 'GP';

    const showShearStrengthParams =
        (analysisOptions.bearingCapacityAnalysis &&
            analysisOptions.bearingCapacityByVesic) ||
        analysisOptions.horizontalSlidingAnalysis;
    const showRockParams =
        analysisOptions.bearingCapacityAnalysis &&
        analysisOptions.bearingCapacityByRQD;

    const requiredFields = {
        soilClassManual: showSoilClassTextBox,
        soilDefinitionManual: showSoilClassTextBox,
        dryUnitWeight: true,
        saturatedUnitWeight: true,
        thickness: true,
        geologicTexture: analysisOptions.idealizedSoilPage,
        soilDefinition: analysisOptions.idealizedSoilPage,
        elasticModulus:
            analysisOptions.settlementAnalysis &&
            analysisOptions.elasticSettlementAnalysis,
        poissonRatio:
            analysisOptions.settlementAnalysis &&
            analysisOptions.elasticSettlementAnalysis,
        volumeCompressibilityCoefficient:
            analysisOptions.settlementAnalysis &&
            analysisOptions.consolidationSettlementAnalysis &&
            analysisOptions.consolidationSettlementMethod === 'MV',
        compressionIndex: showPreconsolidationParams,
        voidRatio: showPreconsolidationParams,
        recompressionIndex: showPreconsolidationParams,
        undrainedShearStrength: showShearStrengthParams,
        preconsolidationPressure: showPreconsolidationParams,
        cohesion: showShearStrengthParams,
        frictionAngle: showShearStrengthParams,
        shearWaveVelocity:
            analysisOptions.bearingCapacityAnalysis &&
            analysisOptions.bearingCapacityByVS,
        RQD: showRockParams,
        IS50: showRockParams,
        kp: showRockParams,
        fineContent: analysisOptions.liquefactionAnalysis,
        liquidLimit:
            analysisOptions.swellingPotentialAnalysis ||
            analysisOptions.liquefactionAnalysis,
        plasticLimit:
            analysisOptions.swellingPotentialAnalysis ||
            analysisOptions.liquefactionAnalysis,
        plasticityIndex:
            analysisOptions.swellingPotentialAnalysis ||
            analysisOptions.liquefactionAnalysis,
        waterContent: analysisOptions.swellingPotentialAnalysis,
    };

    return requiredFields;
};

type FoundationFormRequirements = {
    foundationBaseAngle: boolean;
    slopeAngle: boolean;
    foundationWidth: boolean;
    foundationLength: boolean;
    foundationDepth: boolean;
};

type SoilProfileRequirements = {
    soilClassManual: boolean;
    soilDefinitionManual: boolean;
    dryUnitWeight: boolean;
    saturatedUnitWeight: boolean;
    thickness: boolean;
    geologicTexture: boolean;
    soilDefinition: boolean;
    elasticModulus: boolean;
    poissonRatio: boolean;
    volumeCompressibilityCoefficient: boolean;
    compressionIndex: boolean;
    voidRatio: boolean;
    recompressionIndex: boolean;
    undrainedShearStrength: boolean;
    preconsolidationPressure: boolean;
    cohesion: boolean;
    frictionAngle: boolean;
    RQD: boolean;
    IS50: boolean;
    kp: boolean;
    fineContent: boolean;
    liquidLimit: boolean;
    plasticLimit: boolean;
    waterContent: boolean;
    shearWaveVelocity: boolean;
};
type SeismicFormRequirements = {
    earthquakeMagnitude: boolean;
    SS: boolean;
    S1: boolean;
};
type LoadingFormRequirements = {
    horizontalLoadX: boolean;
    horizontalLoadY: boolean;
    loadingCase1Min: boolean;
    loadingCase2Min: boolean;
    loadingCase3Min: boolean;
    loadingCase1Avg: boolean;
    loadingCase2Avg: boolean;
    loadingCase3Avg: boolean;
    loadingCase1Max: boolean;
    loadingCase2Max: boolean;
    loadingCase3Max: boolean;
};

export type RequiredFields = {
    foundationFormRequirements: FoundationFormRequirements;
    loadingFormRequirements: LoadingFormRequirements;
    seismicFormRequirements: SeismicFormRequirements;
};
