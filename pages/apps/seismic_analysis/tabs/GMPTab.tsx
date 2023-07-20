import DataContext from '../context';
import React, { useContext, useRef, useEffect } from 'react';
import * as btn from 'components/elements/Buttton';
import { createGMPGraphData } from 'lib/apps/seismic_analysis/draw_graph';
import { getTimeSeriesGraphConfig } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import { downloadGMP } from 'lib/apps/seismic_analysis/generate_excel';
import * as tab from 'components/elements/Table';
import { GMPType } from 'types/seismic_analysis/input_types';
import { OutputData, GMP } from 'types/seismic_analysis/api_types';

export default function GMPTab() {
    const { rawOutput, processedOutput } = useContext(DataContext);
    const aiCanvas = useRef<HTMLCanvasElement>(null);
    const sedCanvas = useRef<HTMLCanvasElement>(null);

    const fourierSpectra = rawOutput.fourierSpectra;
    const selectedOutput = Object.keys(processedOutput).length
        ? processedOutput
        : rawOutput;
    const gmp = selectedOutput.groundMotionParameters;

    useEffect(() => {
        if (fourierSpectra) {
            const aiChart = drawGraph(
                rawOutput,
                processedOutput,
                GMPType.ariasIntensityArray,
                aiCanvas,
            );
            const sedChart = drawGraph(
                rawOutput,
                processedOutput,
                GMPType.specificEnergyDensityArray,
                sedCanvas,
            );

            return () => {
                aiChart?.destroy();
                sedChart?.destroy();
            };
        }
    });

    return (
        <div className="ml-8 mr-8">
            <span>
                <btn.DownloadExcelButton
                    onClick={() => downloadGMP(selectedOutput)}
                >
                    Yer Hareketi Parametrelerini İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="grid grid-cols-3">
                <GmpTable gmp={gmp} />
                <div className="col-span-2 ml-4">
                    <div className="h-3/6">
                        <canvas id="aiChart" ref={aiCanvas} />
                    </div>
                    <div className="h-3/6">
                        <canvas id="sedChart" ref={sedCanvas} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const drawGraph = (
    rawOutput: OutputData,
    processedOutput: OutputData,
    dataType: GMPType,
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    let label = '';
    if (dataType == GMPType.ariasIntensityArray) {
        label = 'Arias Yoğunluğu(%)';
    } else {
        label = 'Enerji Akısı(cm2/s)';
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    const graphData = createGMPGraphData(rawOutput, processedOutput, dataType);
    const config = getTimeSeriesGraphConfig(graphData, label);

    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};

const GmpTable = ({ gmp }: { gmp: GMP }) => {
    const round = (num: number) => {
        if (num) {
            return num.toFixed(5);
        } else {
            return '';
        }
    };
    return (
        <tab.Table>
            <tbody>
                <tr>
                    <tab.Td>
                        <b>PGA(g)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.pga)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>PGA&apos;nin Gerçekleştiği Zaman(sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.pgaTime)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>
                            A<sub>RMS</sub>(g)
                        </b>
                    </tab.Td>
                    <tab.Td>{round(gmp.RmsAcceleration)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>İvme Spektrum Yoğunluğu(g*sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.accelerationSpectrumIntensity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Sürdürülebilir Maksimum İvme(g)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.sustainedMaxAcceleration)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Efektif Tasarım İvmesi(g)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.effectiveDesignAcceleration)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>
                            A<sub>95</sub>(g)
                        </b>
                    </tab.Td>
                    <tab.Td>{round(gmp.A95)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>PGV(cm/sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.pgv)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>PGV&apos;nin Gerçekleştiği Zaman(sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.pgvTime)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>
                            V<sub>RMS</sub>(cm/sn)
                        </b>
                    </tab.Td>
                    <tab.Td>{round(gmp.RmsVelocity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Kümülatif Mutlak Hız(cm/sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.cumulativeAbsoluteVelocity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Sürdürülebilir Maksimum Hız(cm/sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.sustainedMaxVelocity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>PGD(cm)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.pgd)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>PGD&apos;nin Gerçekleştiği Zaman(sn)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.pgdTime)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>
                            D<sub>RMS</sub>(cm)
                        </b>
                    </tab.Td>
                    <tab.Td>{round(gmp.RmsDisplacement)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Arias Yoğunluğu</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.ariasIntensity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Karakteristik Yoğunluk</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.characteristicIntensity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>
                            Spesifik Enerji Yoğunluğu(cm<sup>2</sup>/sn)
                        </b>
                    </tab.Td>
                    <tab.Td>{round(gmp.specificEnergyDensity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Hız Spektrum Yoğunluğu(cm)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.velocitySpectrumIntensity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Housner Yoğunluğu(cm)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.housnerIntensity)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Dominant Periyot</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.predominantPeriod)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Ortalama Periyot</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.meanPeriod)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Uniform Süre(s)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.uniformDuration)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Kapsamlı Süre(s)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.bracketedDuration)}</tab.Td>
                </tr>

                <tr>
                    <tab.Td>
                        <b>Anlamlı Süre(s)</b>
                    </tab.Td>
                    <tab.Td>{round(gmp.significantDuration)}</tab.Td>
                </tr>
            </tbody>
        </tab.Table>
    );
};
