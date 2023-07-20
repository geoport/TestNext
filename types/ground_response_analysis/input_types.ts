import { OutputData } from './api_types';
import { SoilData } from 'types/soil_profile';

export interface SoilProfile extends SoilData {
    baseRockType: string;
    baseRockDepth: number | string;
    localSoilClass: string;
    rockLSC: string;
    noBaseRock: boolean;
}

export interface InputData {
    giveReport: boolean;
    owner: string;
    contractor: string;
    city: string;
    county: string;
    pafta: string;
    ada: string;
    parsel: string;
    neighbourhood: string;
    staticProjectOwner: string;
    architect: string;
    geologyEngineer: string;
    geophysicEngineer: string;
    reporter: string;
    reportFooter: string;
    reportDate?: Date | string;
    structuralSystem: string;
    buildingType: string;
    foundationArea?: number | string;
    foundationWidth?: number | string;
    foundationLength?: number | string;
    foundationDepth?: number | string;
    surfaceSpectraMethod: string;
    autoSelect: boolean;
    dyhd: string;
    SS?: number | string;
    S1?: number | string;
    recordData: Record[];
    soilProfile: SoilProfile;
    boreholeDepth?: number | string;
    boreholeNumber?: number | string;
    VS30?: number | string;
}

export interface ContextData {
    data: InputData;
    setData: (data: InputData) => void;
    output: OutputData;
    setOutput: (output: OutputData) => void;
    showFailedAnalysisModal: boolean;
    setShowFailedAnalysisModal: (show: boolean) => void;
    errorModalContent: {
        title: string;
        content: string;
        show: boolean;
    };
    setErrorModalContent: (content: {
        title: string;
        content: string;
        show: boolean;
    }) => void;
    handleInputChange: (event: any, arg?: any) => void;
}

export enum DataTypes {
    displacements = 'displacements',
    velocities = 'velocities',
    accelerations = 'accelerations',
    stresses = 'stresses',
    strains = 'strains',
}

export interface Record {
    unit: string;
    firstRowNo?: number | string;
    lastRowNo?: number | string;
    timeStep?: number | string;
    scaleFactor?: number | string;
    eventName: string;
    stationName: string;
    year?: number | string;
    Mw?: number | string;
    pga?: number | string;
    Rrup?: number | string;
    VS30?: number | string;
    faultType: string;
    accelerations: number[];
}
