import { OutputData } from './api_types';

export interface InputData {
    data: number[];
    timeStep?: number | string;
    dataType: string;
    accUnit?: string;
    velUnit?: string;
    dispUnit?: string;
    applyBaselineCorrection?: boolean;
    baselineCorrectionOrder?: number | string;
    applyFiltering?: boolean;
    filteringType?: string;
    filteringFunction?: string;
    lowCornerFrequency?: number | string;
    highCornerFrequency?: number | string;
    filterOrder?: number | string;
    scaleFactor?: number | string;
    firstRowNo?: number | string;
    lastRowNo?: number | string;
}

export enum DataType {
    accelerations = 'accelerations',
    velocities = 'velocities',
    displacements = 'displacements',
}

export enum FourierType {
    fourierAmplitudes = 'fourierAmplitudes',
    powerAmplitudes = 'powerAmplitudes',
}

export enum ResponseType {
    spectralAccelerations = 'spectralAccelerations',
    spectralVelocities = 'spectralVelocities',
    spectralDisplacements = 'spectralDisplacements',
    pseudoAccelerations = 'pseudoAccelerations',
    pseudoVelocities = 'pseudoVelocities',
}

export enum GMPType {
    ariasIntensityArray = 'ariasIntensityArray',
    specificEnergyDensityArray = 'specificEnergyDensityArray',
}

export type ContextData = {
    inputData: InputData;
    rawOutput: OutputData;
    processedOutput: OutputData;
    setData: Function;
    handleInputChange: (event: any, arg?: any) => void;
};
