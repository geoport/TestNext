import { ProjectData } from 'types/project';
import { SoilData } from 'types/soil_profile';
import { BuildingData } from 'types/building';
import { FoundationData } from 'types/foundation';
import { Loads } from 'types/loading';
import { SeismicData } from 'types/seismicity';
import { SPTLog } from 'types/spt';
import { ConstructionField } from 'types/construction_field';

export interface InputData {
    projectData: ProjectData;
    constructionFieldData: ConstructionField;
    soilData: SoilData;
    buildingData: BuildingData;
    foundationData: FoundationData;
    loadingData: Loads;
    seismicData: SeismicData;
    sptLog: SPTLog;
    analysisOptions: AnalysisOptions;
    jetGroutParams: JetGroutParams;
}

export interface AnalysisOptions {
    giveReport: boolean;
    enhanceBearingCapacity: boolean;
    enhanceSettlement: boolean;
    enhanceLiquefaction: boolean;
    enhanceSoilParams: boolean;
    makeOptimization?: boolean;
}

export interface JetGroutParams {
    elasticModulus: number | string;
    poissonsRatio: number | string;
    shearModulus: number | string;
    diameter: number | string;
    horizontalSpacing: number | string;
    verticalSpacing: number | string;
    unconfinedCompressiveStrength: number | string;
}
