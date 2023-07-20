import GraphColors from 'data/graph_colors.json';
import { zeros, array } from 'numjs';
import { OutputData } from 'types/earthquake_selection/api_types';

type DataSetProps = {
    label: string;
    data: number[];
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    lineTension: number;
    fill: boolean;
};

const createGraphData = (
    outputData: OutputData,
): { labels: number[]; datasets: DataSetProps[] } => {
    const period: number[] = outputData.targetSpectraPeriods;
    const datasets: DataSetProps[] = [
        {
            label: 'Tasarım Spektrumu',
            data: outputData.targetSpectra,
            borderWidth: 2,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
            lineTension: 0,
            fill: false,
        },
    ];
    const colorNames = Object.keys(GraphColors);
    const records = outputData.selectedRecords;

    let total = zeros(period.length);
    const numOfRecords = Object.keys(records).length;
    for (let i = 0; i < numOfRecords; i++) {
        const record = records[`Record${i + 1}`];
        const sa = array(record.spectralAccelerations);
        total = total.add(sa);
        const color = GraphColors[colorNames[i] as keyof typeof GraphColors];
        datasets.push({
            label: `${record.eventName}(RSN${record.RSN})`,
            data: record.spectralAccelerations,
            borderWidth: 1,
            borderColor: color,
            backgroundColor: color,
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
        labels: period,
        datasets: datasets,
    };

    return graphData;
};

export default createGraphData;
