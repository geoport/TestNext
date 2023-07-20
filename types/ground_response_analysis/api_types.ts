import { SoilProfile } from 'types/soil_profile';

export interface TimeHistory {
    timeStep: number | string;
    times: number[];
    displacements: number[];
    velocities: number[];
    accelerations: number[];
    stresses: number[];
    strains: number[];
    periods: number[];
    spectralAccelerations: number[];
    pga: number[];
    pgv: number[];
    pgd: number[];
    maxStrain: number[];
    maxStress: number[];
}

export interface InputMotion {
    timeStep: number | string;
    accelerations: number[];
}

export interface RediscretizedSoilProfile {
    depth: number[];
    unitWeight: number[];
}

export interface OutputMotion {
    [key: string]: TimeHistory;
}

export interface OutputData {
    outputMotions: OutputMotion;
    inputMotions: OutputMotion;
    rediscretizedSoilProfile: RediscretizedSoilProfile;
    reportUrl: string;
}

export interface RequestData {
    inputMotions: {
        [key: string]: InputMotion;
    };
    soilProfile: SoilProfile;
    boundaryCondition: 'rigid' | 'elastic';
    outputDepths?: number[];
}
