import { OutputData } from './api_types';

export type ContextData = {
    data: InputData;
    setData: Function;
    output: OutputData;
    downloadRecordCallback: Function;
    handleInputChange: (event: any, arg?: any) => void;
};

export interface InputData {
    minMw: number;
    maxMw: number;
    minPga: number;
    maxPga: number;
    minAI: number;
    maxAI: number;
    minRrup: number;
    maxRrup: number;
    minVS30: number;
    maxVS30: number;
    minYear: number;
    maxYear: number;
    faultTypes: string[];
    scalingMethod: string;
    optimizeAverage: boolean;
    requiredRecordNumber: number;
    maxAllowedStation: number;
    SDS: number | string;
    SD1: number | string;
    minSelectionPeriod: number;
    maxSelectionPeriod: number;
    minScalingPeriod: number;
    maxScalingPeriod: number;
    minScaleFactor: number;
    maxScaleFactor: number;
    allowScaling: boolean;
    spectraType: string;
    recordsToDownload: {
        [key: string]: boolean;
    };
}
