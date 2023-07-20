import { SoilProfile } from 'types/soil_profile';
import { Loads } from 'types/loading';
import { FoundationData } from 'types/foundation';
import { SeismicData } from 'types/seismicity';
import { CPT } from 'types/cpt';
import { SPT } from 'types/spt';
import { MASW } from 'types/masw';
import { Pressuremeter } from 'types/pressuremeter';

export interface FieldTests {
    cpt?: CPT;
    spt?: SPT;
    masw?: MASW;
    pressuremeter?: Pressuremeter;
}

export interface AnalysisOptions {
    soilCoefficientAnalysis?: boolean;
    soilCoefficientBySettlement?: boolean;
    soilCoefficientByBearingCapacity?: boolean;
    soilCoefficientSelectedValue?: 'MIN' | 'MAX' | 'MEAN';
    swellingPotentialAnalysis?: boolean;
    effectiveDepthAnalysis?: boolean;
    localSoilClassAnalysis?: boolean;
    localSoilClassBySPT?: boolean;
    localSoilClassByVS?: boolean;
    localSoilClassByCu?: boolean;
    settlementAnalysis?: boolean;
    elasticSettlementAnalysis?: boolean;
    consolidationSettlementAnalysis?: boolean;
    consolidationMethod?: 'MV' | 'GP';
    bearingCapacityAnalysis?: boolean;
    bearingCapacityByVesic?: boolean;
    bearingCapacityByPressuremeter?: boolean;
    bearingCapacityByVS?: boolean;
    bearingCapacityByRQD?: boolean;
    shortTermBearingCapacityAnalysis?: boolean;
    longTermBearingCapacityAnalysis?: boolean;
    bearingCapacitySelectedValue?: 'MIN' | 'MAX' | 'MEAN';
    horizontalSlidingAnalysis?: boolean;
    liquefactionAnalysis?: boolean;
    liquefactionBySPT?: boolean;
    liquefactionByVS?: boolean;
    liquefactionByCPT?: boolean;
}

export interface RequestData {
    soilProfile: SoilProfile;
    loads: Loads;
    foundation: FoundationData;
    seismicity: SeismicData;
    fieldTests: FieldTests;
    analysisOptions: AnalysisOptions;
}

// Response interfaces

// Liquefaction
export interface LiquefactionCommonParams {
    soilClasses: string[];
    layerThicknesses: number[];
    dryUnitWeights: number[];
    saturatedUnitWeights: number[];
    fineContents: number[];
    plasticityIndexes: number[];
    layerDepths: number[];
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

export interface LiquefactionBySPT {
    N: number[];
    N60: number[];
    N160: number[];
    N160f: number[];
    Cr: number[];
    commonParams: LiquefactionCommonParams;
}

export interface LiquefactionByVS {
    Vs: number[];
    Vs1: number[];
    Vs1c: number[];
    commonParams: LiquefactionCommonParams;
}

export interface LiquefactionByCPT {
    qc: number[];
    qc1ncs: number[];
    commonParams: LiquefactionCommonParams;
}

export interface LiquefactionResult {
    SPT?: LiquefactionBySPT;
    VS?: LiquefactionByVS;
    CPT?: LiquefactionByCPT;
    isSafe: boolean;
    selectedSettlement: number;
}

// local soil class
export interface LocalSoilClassCommonParams {
    depth: number[];
    H: number[];
    N: number[]; // N60 || VS || Cu
    H_N: number[];
    sum_H_N: number;
    N_30: number;
    soilClass: string;
}

export interface LocalSoilClassResult {
    SPT?: LocalSoilClassCommonParams;
    VS?: LocalSoilClassCommonParams;
    Cu?: LocalSoilClassCommonParams;
    localSoilClassSelected: string;
}

// Horizontal sliding
export interface HorizontalSlidingResult {
    Rth: number;
    Ptv: number;
    Ac: number;
    RpkX: number;
    RpkY: number;
    RptX: number;
    RptY: number;
    sumX: number;
    sumY: number;
    isSafeX: boolean;
    isSafeY: boolean;
    VthX: number;
    VthY: number;
}

// Bearing capacity
// Vesic

export interface BearingCapacityFactors {
    Nq: number;
    Nc: number;
    Ng: number;
}

export interface ShapeFactors {
    Sq: number;
    Sc: number;
    Sg: number;
}

export interface DepthFactors {
    Dq: number;
    Dc: number;
    Dg: number;
}

export interface LoadInclinationFactors {
    Iq: number;
    Ic: number;
    Ig: number;
}

export interface GroundFactors {
    Gq: number;
    Gc: number;
    Gg: number;
}

export interface BaseFactors {
    Bq: number;
    Bc: number;
    Bg: number;
}

export interface BCSoilParams {
    unitWeight: number;
    cohesion: number;
    frictionAngle: number;
}

export interface VesicSingleTerm {
    bearingCapacityFactors: BearingCapacityFactors;
    shapeFactors: ShapeFactors;
    depthFactors: DepthFactors;
    loadInclinationFactors: LoadInclinationFactors;
    groundFactors: GroundFactors;
    baseFactors: BaseFactors;
    soilParams: BCSoilParams;
    ultimateBearingCapacity: number;
    allowableBearingCapacity: number;
    isSafe: boolean;
}

export interface BCVesicResult {
    shortTerm?: VesicSingleTerm;
    longTerm?: VesicSingleTerm;
}

// Pressure meter
export interface BCPressureMeterShortTerm {
    Cu: number;
    Nc: number;
    qu: number;
    allowableBearingCapacity: number;
    isSafe: boolean;
}

export interface BCPressureMeterLongTerm {
    kp: number;
    allowableBearingCapacity: number;
    isSafe: boolean;
}

export interface BCPressureMeterResult {
    shortTerm?: BCPressureMeterShortTerm;
    longTerm?: BCPressureMeterLongTerm;
    netEffectivePressure: number;
    effectivePressure: number;
}

// RQD
export interface BCRqdResult {
    kp: number;
    Is50: number;
    RQD: number;
    ultimateBearingCapacity: number;
    allowableBearingCapacity: number;
    isSafe: boolean;
    qLab: number;
    qfRatio: number;
}

// VS
export interface BCVsResult {
    VS: number;
    unitWeight: number;
    ultimateBearingCapacity: number;
    allowableBearingCapacity: number;
    isSafe: boolean;
    safetyFactor: number;
}

export interface BearingCapacityResult {
    vesic?: BCVesicResult;
    pressureMeter?: BCPressureMeterResult;
    RQD?: BCRqdResult;
    VS?: BCVsResult;
    shortTermBearingCapacity?: number;
    longTermBearingCapacity?: number;
    isShortTermSafe?: boolean;
    isLongTermSafe?: boolean;
}
export interface SettlementResult {
    elasticSettlements?: number[];
    consolidationSettlements?: number[];
    totalSettlements: number[];
    totalElasticSettlement: number;
    totalConsolidationSettlement: number;
    totalSettlement: number;
}

export interface EffectiveDepthResult {
    depthByPressure: number;
    depthByDimension: number;
    selectedDepth: number;
}

export interface SwellingPotentialResult {
    layerCenters: number[];
    effectiveStresses: number[];
    deltaSigmas: number[];
    swellingPressures: number[];
    isSafe: boolean[];
    netFoundationPressure: number;
}

export interface SoilCoefficientResult {
    bySettlement?: number;
    byBearingCapacity?: number;
    selectedSoilCoefficient: number;
}

export interface SpectralCoordinates {
    SS: number;
    S1: number;
    FS: number;
    F1: number;
    SDS: number;
    SD1: number;
}

export interface SPTLog {
    depth: number[];
    N: number[];
    energyCorrectionFactor: number;
    diameterCorrectionFactor: number;
    samplerCorrectionFactor: number;
    makeCorrection: boolean;
    N60: number[];
    N160: number[];
    N160F: number[];
    Cr: number[];
    Cn: number[];
    fineContent: number[];
    alpha: number[];
    beta: number[];
    averageN: number;
}

export interface GoPrimeResponse {
    liquefaction?: LiquefactionResult;
    localSoilClass?: LocalSoilClassResult;
    horizontalSliding?: HorizontalSlidingResult;
    bearingCapacity?: BearingCapacityResult;
    settlement?: SettlementResult;
    effectiveDepth?: EffectiveDepthResult;
    swellingPotential?: SwellingPotentialResult;
    soilCoefficient?: SoilCoefficientResult;
    spectralCoordinates?: SpectralCoordinates;
    sptLog?: SPTLog;
    reportUrl: string;
}
