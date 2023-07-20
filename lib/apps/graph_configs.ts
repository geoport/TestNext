/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChartData, ChartConfiguration } from 'chart.js/auto';

export enum legendPositions {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    center = 'center',
}
export function getSpectraGraphConfig(
    data: ChartData,
    x_label: string,
    y_label: string,
    legendPosition: legendPositions = legendPositions.right,
): ChartConfiguration {
    const config: ChartConfiguration = {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            elements: {
                point: {
                    radius: 0,
                },
            },
            plugins: {
                legend: {
                    display: data.datasets.length > 1,
                    position: legendPosition,
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: x_label,
                        font: {
                            size: 20,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { top: 10 },
                    },
                    type: 'logarithmic',
                    ticks: {
                        minRotation: 45,
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: y_label,
                        font: {
                            size: 20,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { bottom: 10 },
                    },
                },
            },
        },
    };

    return config;
}

export function getTimeSeriesGraphConfig(
    data: ChartData,
    y_label: string,
): ChartConfiguration {
    const config: ChartConfiguration = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            animation: false,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0,
                },
            },
            plugins: {
                legend: {
                    display: data.datasets.length > 1,
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zaman (s)',
                        font: {
                            size: 16,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { top: 10 },
                    },
                    ticks: {
                        callback: function (val, index) {
                            // Hide the label of every 2nd dataset
                            return parseFloat(
                                this.getLabelForValue(val as number),
                            ).toFixed(2);
                        },
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: y_label,
                        font: {
                            size: 16,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { bottom: 10 },
                    },
                },
            },
        },
    };

    return config;
}

export function getProfileGraphConfig(
    data: ChartData,
    x_label: string,
    displayYLabel: boolean,
    round = 4,
): ChartConfiguration {
    const depths = data.datasets[0].data as number[];
    const maxY = depths[depths.length - 1];
    const config: ChartConfiguration = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            animation: false,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0,
                },
            },
            plugins: {
                legend: {
                    display: data.datasets.length > 1,
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: x_label,
                        font: {
                            size: 16,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { top: 10 },
                    },
                    ticks: {
                        callback: function (val, index) {
                            // Hide the label of every 2nd dataset
                            return parseFloat(
                                this.getLabelForValue(val as number),
                            ).toFixed(round);
                        },
                    },
                },
                y: {
                    reverse: true,
                    title: {
                        display: displayYLabel,
                        text: 'Derinlik (m)',
                        font: {
                            size: 16,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { bottom: 10 },
                    },
                    ticks: {
                        callback: function (val, index) {
                            // Hide the label of every 2nd dataset
                            return parseFloat(
                                this.getLabelForValue(val as number),
                            ).toFixed(2);
                        },
                    },
                    max: maxY as number,
                },
            },
        },
    };

    return config;
}
