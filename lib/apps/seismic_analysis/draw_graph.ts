import GraphColors from '../../../data/graph_colors.json';
import { array } from 'numjs';
import * as inputTypes from 'types/seismic_analysis/input_types';
import * as apiTypes from 'types/seismic_analysis/api_types';

type DataSetProps = {
    label: string;
    data: number[];
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
};

export const createTimeSeriesData = (
    rawOutput: apiTypes.OutputData,
    processedOutput: apiTypes.OutputData,
    dataType: inputTypes.DataType,
): { labels: number[]; datasets: DataSetProps[] } => {
    const time = rawOutput.timeHistory.times;
    const rawData = rawOutput.timeHistory[dataType];
    const isProcessed = processedOutput.timeHistory !== undefined;
    const datasets = [
        {
            label: 'Ham Kayıt',
            data: rawData,
            borderWidth: 1,
            borderColor: isProcessed ? GraphColors.darkGrey : GraphColors.black,
            backgroundColor: isProcessed
                ? GraphColors.darkGrey
                : GraphColors.black,
            fill: false,
        },
    ];

    if (isProcessed) {
        datasets.push({
            label: 'İşlenmiş Kayıt',
            data: processedOutput.timeHistory[dataType],
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
            fill: false,
        });
    }

    const graphData = {
        labels: time,
        datasets: datasets,
    };

    return graphData;
};

export const createFourierSpectraData = (
    rawOutput: apiTypes.OutputData,
    processedOutput: apiTypes.OutputData,
    dataType: inputTypes.FourierType,
) => {
    const freq = rawOutput.fourierSpectra.frequencies;
    const isProcessed = processedOutput.fourierSpectra !== undefined;
    const datasets = [
        {
            label: 'Ham Kayıt',
            data: rawOutput.fourierSpectra[dataType],
            borderWidth: 1,
            borderColor: isProcessed ? GraphColors.darkGrey : GraphColors.black,
            backgroundColor: isProcessed
                ? GraphColors.darkGrey
                : GraphColors.black,
        },
    ];

    if (isProcessed) {
        datasets.push({
            label: 'İşlenmiş Kayıt',
            data: processedOutput.fourierSpectra[dataType],
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
        });
    }

    const graphData = {
        labels: freq,
        datasets: datasets,
    };

    return graphData;
};

export const createResponseSpectraData = (
    rawOutput: apiTypes.OutputData,
    processedOutput: apiTypes.OutputData,
    dataType: inputTypes.ResponseType,
) => {
    const periods = rawOutput.responseSpectra.periods;
    const isProcessed = processedOutput.responseSpectra !== undefined;
    const datasets = [
        {
            label: 'Ham Kayıt',
            data: rawOutput.responseSpectra[dataType],
            borderWidth: 1,
            borderColor: isProcessed ? GraphColors.darkGrey : GraphColors.black,
            backgroundColor: isProcessed
                ? GraphColors.darkGrey
                : GraphColors.black,
        },
    ];

    if (isProcessed) {
        datasets.push({
            label: 'İşlenmiş Kayıt',
            data: processedOutput.responseSpectra[dataType],
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
        });
    }

    const graphData = {
        labels: periods,
        datasets: datasets,
    };

    return graphData;
};

export const createGMPGraphData = (
    rawOutput: apiTypes.OutputData,
    processedOutput: apiTypes.OutputData,
    dataType: inputTypes.GMPType,
) => {
    const times = rawOutput.timeHistory.times;
    const isProcessed = processedOutput.groundMotionParameters !== undefined;
    const rawData = rawOutput.groundMotionParameters[dataType];

    const normalizedRawData = array(rawData)
        .divide(rawData[rawData.length - 1])
        .multiply(100)
        .tolist();
    const datasets = [
        {
            label: 'Ham Kayıt',
            data: normalizedRawData,
            borderWidth: 1,
            borderColor: isProcessed ? GraphColors.darkGrey : GraphColors.black,
            backgroundColor: isProcessed
                ? GraphColors.darkGrey
                : GraphColors.black,
        },
    ];

    if (isProcessed) {
        const processedData = processedOutput.groundMotionParameters[dataType];
        const normalizedProcessedData = array(processedData)
            .divide(processedData[processedData.length - 1])
            .multiply(100)
            .tolist();
        datasets.push({
            label: 'İşlenmiş Kayıt',
            data: normalizedProcessedData,
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
        });
    }

    const graphData = {
        labels: times,
        datasets: datasets,
    };

    return graphData;
};
