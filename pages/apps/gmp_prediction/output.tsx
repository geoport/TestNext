import * as btn from 'components/elements/Buttton';
import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { createResponseSpectraData } from 'lib/apps/gmp_prediction/draw_graph';
import { getSpectraGraphConfig } from 'lib/apps/graph_configs';
import * as types from 'lib/apps/gmp_prediction/types';
import { generateSpectralAccelerations } from 'lib/apps/gmp_prediction/generate_files';

const OutputDiv = ({ output }: { output: types.OutputData }) => {
    const units: Record<string, string> = {
        PGA: 'g',
        spectral_acceleration: 'g',
        PGV: 'cm/s',
        PGD: 'cm',
    };
    const outputKeys: Record<string, string> = {
        PGA: 'PGA',
        SA: 'spectral_acceleration',
        PGV: 'PGV',
        PGD: 'PGD',
    };
    const outputType = outputKeys[output.outputType];
    const result = output[outputType as keyof types.OutputData] as number;
    return (
        <div>
            <hr className="mt-3" />
            {outputType ? (
                <>
                    <h3 className="mt-10 mb-3 text-xl">
                        {outputType == 'spectral_acceleration'
                            ? 'Spektral İvme'
                            : outputType}
                    </h3>
                    <p>
                        {result.toFixed(10)} ({units[outputType]})
                    </p>
                </>
            ) : (
                <ResponseSpectra output={output} />
            )}
        </div>
    );
};

function ResponseSpectra({ output }: { output: types.OutputData }) {
    const saCanvas = useRef<HTMLCanvasElement>(null);
    const periods = output.periods;
    const spectralAccelerations = output.spectral_accelerations;

    useEffect(() => {
        const graphData = createResponseSpectraData(
            periods as number[],
            spectralAccelerations as number[],
        );
        const config = getSpectraGraphConfig(
            graphData,
            'Periyod (s)',
            'Spektral İvme(g)',
        );
        if (!saCanvas.current) return;
        const ctx = saCanvas.current.getContext('2d');
        if (!ctx) return;
        const saChart = new Chart(ctx, config);

        return () => {
            saChart.destroy();
        };
    });

    return (
        <>
            <span>
                <btn.DownloadExcelButton
                    onClick={() => generateSpectralAccelerations(output)}
                >
                    Tepki Spektrumlarını İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-96">
                <canvas id="paChart" ref={saCanvas} />
            </div>
        </>
    );
}

export default OutputDiv;
