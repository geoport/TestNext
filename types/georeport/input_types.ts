import { GoPrimeResponse } from './api_types';
import { ProjectData } from 'types/project';
import { BuildingData } from 'types/building';
import { ConstructionField } from 'types/construction_field';
import { Loads } from 'types/loading';
import { FoundationData } from 'types/foundation';
import { SoilData } from 'types/soil_profile';
import { SeismicData } from 'types/seismicity';
import { CPTData } from 'types/cpt';
import { PressuremeterData } from 'types/pressuremeter';
import { MASWData } from 'types/masw';
import { SPTLog } from 'types/spt';

export type ContextData = {
    data: InputData;
    setData: Function;
    analysisOptions: AnalysisOptions;
    output: GoPrimeResponse;
};

export interface Coordinate {
    latitude: string;
    longitude: string;
}

export interface SoilProfileData extends SoilData {
    checkThickClayLayer: boolean;
    checkHighPlasticityClayContent: boolean;
    checkSoftClayContent: boolean;
    checkSensitiveClayContent: boolean;
}

export interface ConstructionFieldData extends ConstructionField {
    fieldCoordinates: Coordinate[];
    parcelArea?: number | string;
    landSlope?: number | string;
    northParcelInfo: string;
    southParcelInfo: string;
    eastParcelInfo: string;
    westParcelInfo: string;
    northStructuralInfo: string;
    southStructuralInfo: string;
    eastStructuralInfo: string;
    westStructuralInfo: string;
}

export interface LabData {
    depth?: number | string;
    boreholeNo?: string;
    waterContent?: number | string;
    fineContent?: number | string;
    liquidLimit?: number | string;
    plasticLimit?: number | string;
    plasticityIndex?: number | string;
    naturalUnitWeight?: number | string;
    cohesion?: number | string;
    frictionAngle?: number | string;
    soilClass?: string;
}

export interface BoreholeData {
    boreHoleNumber?: string;
    boreHoleDepth?: number | string;
}
export interface SiteInvestigaionData {
    pitNumber?: number | string;
    totalPitDepth?: number | string;
    investigationDateStart?: Date | string;
    investigationDateFinish?: Date | string;
    boreHoleData: BoreholeData[];
    cptData: CPTData[];
    pressuremeterData: PressuremeterData[];
    maswData: MASWData[];
    sptData: SPTLog;
    labExperiments: LabData[];
    investigationCategory: string;
}

export interface AnalysisOptions {
    coverPage: boolean;
    contentPage: boolean;
    figuresTablesPage: boolean;
    approvalsPage: boolean;
    introductionPage: boolean;
    constructionFieldPage: boolean;
    structuralInformationPage: boolean;
    soilInvestigationPage: boolean;
    additionalSoilInvestigationPage: boolean;
    idealizedSoilPage: boolean;
    parameterSelectionPage: boolean;
    deepFoundationPage: boolean;
    groundImprovementPage: boolean;
    foundationSuggestionPage: boolean;
    retainingSystemsPage: boolean;
    resultsPage: boolean;
    referancesPage: boolean;

    designSpectrumAnalysis: boolean;
    horizontalSlidingAnalysis: boolean;

    localSoilClassAnalysis: boolean;
    localSoilClassBySPT: boolean;
    localSoilClassByVS: boolean;
    localSoilClassByCu: boolean;

    liquefactionAnalysis: boolean;
    liquefactionBySPT: boolean;
    liquefactionByVS: boolean;
    liquefactionByCPT: boolean;

    bearingCapacityAnalysis: boolean;
    bearingCapacityLoadingCase: string;
    bearingCapacityLoadingValue: string;
    bearingCapacityByVesic: boolean;
    bearingCapacityByVS: boolean;
    bearingCapacityByPressuremeter: boolean;
    bearingCapacityByRQD: boolean;
    bearingCapacityShortTerm: boolean;
    bearingCapacityLongTerm: boolean;

    settlementAnalysis: boolean;
    settlementLoadingCase: string;
    settlementLoadingValue: string;
    elasticSettlementAnalysis: boolean;
    consolidationSettlementAnalysis: boolean;
    consolidationSettlementMethod: string;

    soilCoefficientAnalysis: boolean;
    soilCoefficientBySettlement: boolean;
    soilCoefficientByBearingCapacity: boolean;

    swellingPotentialAnalysis: boolean;
    swellingPotentialLoadingCase: string;
    swellingPotentialLoadingValue: string;

    effectiveDepthAnalysis: boolean;
    effectiveDepthLoadingCase: string;
    effectiveDepthLoadingValue: string;
}

export interface InputData {
    projectData: ProjectData;
    buildingData: BuildingData;
    constructionFieldData: ConstructionFieldData;
    loadingData: Loads;
    foundationData: FoundationData;
    soilProfile: SoilProfileData;
    seismicData: SeismicData;
    siteInvestigationData: SiteInvestigaionData;
}
