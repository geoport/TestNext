export interface TimeHistory {
    name: string;
    accelerations: number[];
    velocities: number[];
    displacements: number[];
    times: number[];
    timeStep: number;
}

export interface ResponseSpectra {
    spectralAccelerations: number[];
    spectralVelocities: number[];
    spectralDisplacements: number[];
    pseudoAccelerations: number[];
    pseudoVelocities: number[];
    periods: number[];
}

export interface FourierSpectra {
    frequencies: number[];
    fourierAmplitudes: number[];
    powerAmplitudes: number[];
}

export interface GMP {
    pga: number;
    pgaTime: number;
    pgv: number;
    pgvTime: number;
    pgd: number;
    pgdTime: number;
    housnerIntensity: number;
    sustainedMaxAcceleration: number;
    sustainedMaxVelocity: number;
    effectiveDesignAcceleration: number;
    accelerationSpectrumIntensity: number;
    velocitySpectrumIntensity: number;
    A95: number;
    predominantPeriod: number;
    meanPeriod: number;
    uniformDuration: number;
    bracketedDuration: number;
    significantDuration: number;
    effectiveDuration: number;
    ariasIntensity: number;
    ariasIntensityArray: number[];
    RmsAcceleration: number;
    RmsVelocity: number;
    RmsDisplacement: number;
    characteristicIntensity: number;
    specificEnergyDensity: number;
    specificEnergyDensityArray: number[];
    cumulativeAbsoluteVelocity: number;
}

export interface OutputData {
    timeHistory: TimeHistory;
    responseSpectra: ResponseSpectra;
    fourierSpectra: FourierSpectra;
    groundMotionParameters: GMP;
}
