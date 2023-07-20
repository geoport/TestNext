import { InputData, AnalysisOptions, JetGroutParams } from './input_types';
import { SoilProfile } from 'types/soil_profile';
import { FoundationData } from 'types/foundation';
import { Loads } from 'types/loading';
import { SeismicData } from 'types/seismicity';
import { SPT } from 'types/spt';

export interface LiquefactionResults {
    soilClasses: string[];
    layerThicknesses: number[];
    dryUnitWeights: number[];
    saturatedUnitWeights: number[];
    fineContents: number[];
    plasticityIndexes: number[];
    layerDepths: number[];
    N: number[];
    N60: number[];
    N160: number[];
    N160f: number[];
    Cr: number[];
    normalStresses: number[];
    effectiveStresses: number[];
    Cn: number[];
    CRR: number[];
    CRR75: number[];
    CSR: number[];
    safetyFactors: number[];
    isSafe: boolean[];
    settlements: number[];
    totalSettlement: number;
    MSF: number;
    Rd: number[];
}

export interface OutputData {
    averageCohesion: number;
    averageFrictionAngle: number;
    averageElasticModulus: number;
    averageShearModulus: number;
    effectiveSoilClass: string;
    liquefiedSoilClass: string;
    Gr: number;
    areaRatio: number;
    groutArea: number;
    shearStressRatio: number;
    enhancedCSR: number;
    enhancedSafetyFactor: number;
    enhancedCohesion: number;
    enhancedFrictionAngle: number;
    enhancedElasticModulus: number;
    enhancedBearingCapacity: number;
    groutElasticModulus: number;
    groutCohesion: number;
    groutFrictionAngle: number;
    minGroutDepth: number;
    maxGroutDepth: number;
    groutLength: number;
    minCSR: number;
    minCRR: number;
    minFS: number;
    shearModulusRatio: number;
    liquefactionStart: number;
    liquefactionEnd: number;
    enhancedSettlement: number;
    initialLiquefactionResults: LiquefactionResults;
    reportUrl?: string;
}

export interface RequestData {
    soilProfile: SoilProfile;
    loadingData: Loads;
    foundationData: FoundationData;
    seismicData: SeismicData;
    sptLog: SPT;
    analysisOptions: AnalysisOptions;
    jetGroutParams: JetGroutParams;
}

export type ContextData = {
    data: InputData;
    setData: Function;
    output: OutputData;
};
