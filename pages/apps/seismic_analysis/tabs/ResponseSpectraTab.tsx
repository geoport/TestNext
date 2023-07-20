import DataContext from '../context';
import React, { useContext, useRef, useEffect } from 'react';
import * as btn from 'components/elements/Buttton';
import { createResponseSpectraData } from 'lib/apps/seismic_analysis/draw_graph';
import { getSpectraGraphConfig, legendPositions } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import { downloadResponseSpectra } from 'lib/apps/seismic_analysis/generate_excel';
import * as types from 'types/seismic_analysis/input_types';
import { OutputData } from 'types/seismic_analysis/api_types';

export default function ResponseSpectraTab() {
    const { rawOutput, processedOutput } = useContext(DataContext);
    const saCanvas = useRef<HTMLCanvasElement>(null);
    const paCanvas = useRef<HTMLCanvasElement>(null);
    const pvCanvas = useRef<HTMLCanvasElement>(null);
    const svCanvas = useRef<HTMLCanvasElement>(null);
    const sdCanvas = useRef<HTMLCanvasElement>(null);

    const responseSpectra = rawOutput.responseSpectra;
    const selectedOutput = Object.keys(processedOutput).length
        ? processedOutput
        : rawOutput;

    useEffect(() => {
        if (responseSpectra) {
            const saChart = drawGraph(
                rawOutput,
                processedOutput,
                types.ResponseType.spectralAccelerations,
                saCanvas,
            );
            const paChart = drawGraph(
                rawOutput,
                processedOutput,
                types.ResponseType.pseudoAccelerations,
                paCanvas,
            );
            const pvChart = drawGraph(
                rawOutput,
                processedOutput,
                types.ResponseType.pseudoVelocities,
                pvCanvas,
            );
            const svChart = drawGraph(
                rawOutput,
                processedOutput,
                types.ResponseType.spectralVelocities,
                svCanvas,
            );
            const sdChart = drawGraph(
                rawOutput,
                processedOutput,
                types.ResponseType.spectralDisplacements,
                sdCanvas,
            );

            return () => {
                saChart?.destroy();
                svChart?.destroy();
                sdChart?.destroy();
                paChart?.destroy();
                pvChart?.destroy();
            };
        }
    });

    return (
        <div className="ml-8 mr-8">
            <span>
                <btn.DownloadExcelButton
                    onClick={() => downloadResponseSpectra(selectedOutput)}
                >
                    Tepki Spektrumlarını İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-96">
                <canvas id="paChart" ref={paCanvas} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="h-96">
                    <canvas id="saChart" ref={saCanvas} />
                </div>
                <div className="h-96">
                    <canvas id="pvChart" ref={pvCanvas} />
                </div>
                <div className="h-96">
                    <canvas id="sdChart" ref={sdCanvas} />
                </div>
                <div className="h-96">
                    <canvas id="svChart" ref={svCanvas} />
                </div>
            </div>
        </div>
    );
}

const drawGraph = (
    rawOutput: OutputData,
    processedOutput: OutputData,
    dataType: types.ResponseType,
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    let label = '';
    switch (dataType) {
        case types.ResponseType.spectralAccelerations:
            label = 'Spektral İvme(g)';
            break;
        case types.ResponseType.spectralVelocities:
            label = 'Spektral Hız(cm/s)';
            break;
        case types.ResponseType.spectralDisplacements:
            label = 'Spektral Yer Değiştirme(cm)';
            break;
        case types.ResponseType.pseudoAccelerations:
            label = 'Pseudo İvme(g)';
            break;
        default:
            label = 'Pseudo Hız(cm/s)';
            break;
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    const graphData = createResponseSpectraData(
        rawOutput,
        processedOutput,
        dataType,
    );
    const config = getSpectraGraphConfig(
        graphData,
        'Periyod (s)',
        label,
        legendPositions.top,
    );

    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};
