export interface SPTData {
    depth?: number | string;
    N?: number | string;
}

export interface SPTLog {
    energyCorrectionFactor: number | string;
    diameterCorrectionFactor: number | string;
    samplerCorrectionFactor: number | string;
    makeCorrection: boolean;
    log: SPTData[];
}

export interface SPT {
    depth: number[];
    N: number[];
    energyCorrectionFactor: number | string;
    diameterCorrectionFactor: number | string;
    samplerCorrectionFactor: number | string;
    makeCorrection: boolean;
}
