import GraphColors from 'data/graph_colors.json';

export const createResponseSpectraData = (
    periods: number[],
    spectralAccelerations: number[],
) => {
    const datasets = [
        {
            data: spectralAccelerations,
            borderWidth: 1,
            borderColor: GraphColors.black,
            backgroundColor: GraphColors.black,
        },
    ];

    const graphData = {
        labels: periods,
        datasets: datasets,
    };

    return graphData;
};
