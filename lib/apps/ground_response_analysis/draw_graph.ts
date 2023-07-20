import GraphColors from '../../../data/graph_colors.json';
import { zeros, array } from 'numjs';
import * as inputTypes from 'types/ground_response_analysis/input_types';
import * as apiTypes from 'types/ground_response_analysis/api_types';

type DataSetProps = {
    label?: string;
    data: number[];
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    lineTension?: number;
};

type GraphData = {
    labels: number[];
    datasets: DataSetProps[];
};

export const createTimeSeriesData = (
    inputMotion: apiTypes.TimeHistory,
    outputMotion: apiTypes.TimeHistory,
    dataType: inputTypes.DataTypes,
): GraphData => {
    const time = inputMotion.times;
    const inputData = inputMotion[dataType];
    const outputData = outputMotion[dataType];

    const datasets: DataSetProps[] = [
        {
            label: 'Girdi',
            data: inputData,
            borderWidth: 1,
            borderColor: GraphColors.darkGrey,
            backgroundColor: GraphColors.darkGrey,
            fill: false,
        },
        {
            label: 'Yüzey',
            data: outputData,
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
            fill: false,
        },
    ];

    const graphData = {
        labels: time,
        datasets: datasets,
    };

    return graphData;
};

export const createResponseSpectraData = (
    periods: number[],
    inputSA: number[],
    outputSA: number[],
): GraphData => {
    const datasets: DataSetProps[] = [
        {
            label: 'Girdi',
            data: inputSA,
            borderWidth: 1,
            borderColor: GraphColors.darkGrey,
            backgroundColor: GraphColors.darkGrey,
            fill: false,
        },
        {
            label: 'Yüzey',
            data: outputSA,
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
            fill: false,
        },
    ];

    const graphData = {
        labels: periods,
        datasets: datasets,
    };

    return graphData;
};

export const createAverageResponseSpectraData = (
    outputMotions: apiTypes.OutputMotion,
): GraphData => {
    const datasets: DataSetProps[] = [];
    const colorNames = Object.keys(GraphColors);
    const periods = outputMotions['Record1'].periods;
    let total = zeros(periods.length);
    const numOfRecords = Object.keys(outputMotions).length;

    for (let i = 0; i < numOfRecords; i++) {
        const record = outputMotions[`Record${i + 1}`];
        const sa = array(record.spectralAccelerations);
        total = total.add(sa);
        const color = colorNames[i] as keyof typeof GraphColors;
        datasets.push({
            label: `#${i + 1}`,
            data: record.spectralAccelerations,
            borderWidth: 1,
            borderColor: GraphColors[color],
            backgroundColor: GraphColors[color],
            lineTension: 0.2,
            fill: false,
        });
    }

    datasets.push({
        label: 'Ortalama',
        data: total.divide(numOfRecords).tolist(),
        borderWidth: 2,
        borderColor: GraphColors.black,
        backgroundColor: GraphColors.black,
        lineTension: 0.2,
        fill: false,
    });

    const graphData = {
        labels: periods,
        datasets: datasets,
    };

    return graphData;
};

export const createStressStrainData = (
    outputMotion: apiTypes.TimeHistory,
    dataType: inputTypes.DataTypes,
): GraphData => {
    const time = outputMotion.times;
    const outputData = outputMotion[dataType];

    const datasets: DataSetProps[] = [
        {
            data: outputData,
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
            fill: false,
        },
    ];

    const graphData = {
        labels: time,
        datasets: datasets,
    };

    return graphData;
};

export const createProfileData = (
    depths: number[],
    data: number[],
): GraphData => {
    const datasets: DataSetProps[] = [
        {
            label: ``,
            data: depths,
            borderWidth: 1,
            borderColor: GraphColors[`black`],
            backgroundColor: GraphColors[`black`],
            lineTension: 0.2,
            fill: false,
        },
    ];

    const graphData = {
        labels: data,
        datasets: datasets,
    };

    return graphData;
};
