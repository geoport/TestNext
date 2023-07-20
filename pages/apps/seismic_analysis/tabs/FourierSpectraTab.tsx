import DataContext from '../context';
import React, { useContext, useRef, useEffect } from 'react';
import * as btn from 'components/elements/Buttton';
import { createFourierSpectraData } from 'lib/apps/seismic_analysis/draw_graph';
import { getSpectraGraphConfig, legendPositions } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import { downloadFourierSpectra } from 'lib/apps/seismic_analysis/generate_excel';
import { FourierType } from 'types/seismic_analysis/input_types';
import { OutputData } from 'types/seismic_analysis/api_types';

export default function FourierSpectraTab() {
    const { rawOutput, processedOutput } = useContext(DataContext);
    const faCanvas = useRef<HTMLCanvasElement>(null);
    const paCanvas = useRef<HTMLCanvasElement>(null);

    const fourierSpectra = rawOutput.fourierSpectra;
    const selectedOutput = Object.keys(processedOutput).length
        ? processedOutput
        : rawOutput;
    useEffect(() => {
        if (fourierSpectra) {
            const faChart = drawGraph(
                rawOutput,
                processedOutput,
                FourierType.fourierAmplitudes,
                faCanvas,
            );
            const paChart = drawGraph(
                rawOutput,
                processedOutput,
                FourierType.powerAmplitudes,
                paCanvas,
            );

            return () => {
                faChart?.destroy();
                paChart?.destroy();
            };
        }
    });

    return (
        <div className="ml-8 mr-8">
            <span>
                <btn.DownloadExcelButton
                    onClick={() => downloadFourierSpectra(selectedOutput)}
                >
                    Fourier ve Güç Spektrumlarını İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="grid grid-cols-2">
                <div className="h-96">
                    <canvas id="faChart" ref={faCanvas} />
                </div>
                <div>
                    <canvas id="paChart" ref={paCanvas} />
                </div>
            </div>
        </div>
    );
}

const drawGraph = (
    rawOutput: OutputData,
    processedOutput: OutputData,
    dataType: FourierType,
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    let label = '';
    if (dataType == FourierType.fourierAmplitudes) {
        label = 'Fourier Büyüklüğü';
    } else {
        label = 'Güç Yoğunluğu';
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    const graphData = createFourierSpectraData(
        rawOutput,
        processedOutput,
        dataType,
    );
    const config = getSpectraGraphConfig(
        graphData,
        'Frekans (Hz)',
        label,
        legendPositions.top,
    );
    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};
