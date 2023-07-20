import ProcessForm from 'forms/seismic_analysis/process_form';
import * as fields from 'components/elements/FormFields';
import DataContext from '../context';
import React, { useContext, useRef, useEffect } from 'react';
import { getSelected } from 'lib/helper';
import * as btn from 'components/elements/Buttton';
import { createTimeSeriesData } from 'lib/apps/seismic_analysis/draw_graph';
import { getTimeSeriesGraphConfig } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import { downloadTimeSeries } from 'lib/apps/seismic_analysis/generate_excel';
import * as types from 'types/seismic_analysis/input_types';
import { OutputData } from 'types/seismic_analysis/api_types';

export default function TimeSeriesTab({
    handlePreprocess,
}: {
    handlePreprocess: () => void;
}) {
    const { inputData, rawOutput, processedOutput, handleInputChange } =
        useContext(DataContext);
    const form = new ProcessForm();
    return (
        <>
            <div className="grid w-full grid-cols-4 gap-5 divide-x">
                <div>
                    <div className="mb-3">
                        <fields.BooleanField
                            formField={form.applyBaselineCorrection}
                            checked={
                                inputData.applyBaselineCorrection as boolean
                            }
                            setChecked={(e) => handleInputChange(e, 'boolean')}
                        />
                    </div>
                    <fields.InputField
                        formField={form.baselineCorrectionOrder}
                        value={inputData.baselineCorrectionOrder as number}
                        onChange={handleInputChange}
                    />
                    <hr className="mb-3 mt-3" />
                    <div className="mb-3">
                        <fields.BooleanField
                            formField={form.applyFiltering}
                            checked={inputData.applyFiltering as boolean}
                            setChecked={(e) => handleInputChange(e, 'boolean')}
                        />
                    </div>
                    <fields.InputField
                        formField={form.filterOrder}
                        value={inputData.filterOrder as number}
                        onChange={handleInputChange}
                    />
                    <fields.ListBox
                        formField={form.filteringType}
                        selected={getSelected(
                            form.filteringType,
                            inputData.filteringType as string,
                        )}
                        setSelected={(e) =>
                            handleInputChange({
                                target: {
                                    name: 'filteringType',
                                    value: e.value,
                                },
                            })
                        }
                    />
                    <fields.ListBox
                        formField={form.filteringFunction}
                        selected={getSelected(
                            form.filteringFunction,
                            inputData.filteringFunction as string,
                        )}
                        setSelected={(e) =>
                            handleInputChange({
                                target: {
                                    name: 'filteringFunction',
                                    value: e.value,
                                },
                            })
                        }
                    />
                    <fields.InputField
                        formField={form.lowCornerFrequency}
                        value={inputData.lowCornerFrequency as number}
                        onChange={handleInputChange}
                        hide={inputData.filteringFunction === 'highpass'}
                    />
                    <fields.InputField
                        formField={form.highCornerFrequency}
                        value={inputData.highCornerFrequency as number}
                        onChange={handleInputChange}
                        hide={inputData.filteringFunction === 'lowpass'}
                    />
                    <div className="mt-4">
                        <btn.BorderButton
                            onClick={handlePreprocess}
                            disabled={
                                !(
                                    inputData.applyFiltering ||
                                    inputData.applyBaselineCorrection
                                )
                            }
                        >
                            Uygula
                        </btn.BorderButton>
                    </div>
                </div>
                <div className="col-span-3 pl-2">
                    <Graph
                        rawOutput={rawOutput}
                        processedOutput={processedOutput}
                    />
                </div>
            </div>
        </>
    );
}

const drawGraph = (
    rawOutput: OutputData,
    processedOutput: OutputData,
    dataType: types.DataType,
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    let label = '';
    switch (dataType) {
        case types.DataType.accelerations:
            label = 'İvme (g)';
            break;
        case types.DataType.velocities:
            label = 'Hız (cm/s)';
            break;
        default:
            label = 'Deplasman (cm)';
            break;
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');

    const graphData = createTimeSeriesData(
        rawOutput,
        processedOutput,
        dataType,
    );
    const config = getTimeSeriesGraphConfig(graphData, label);

    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};

const Graph = ({
    rawOutput,
    processedOutput,
}: {
    rawOutput: OutputData;
    processedOutput: OutputData;
}) => {
    const accCanvas = useRef(null);
    const velCanvas = useRef(null);
    const dispCanvas = useRef(null);
    const timeHistory = rawOutput.timeHistory;
    const selectedOutput = Object.keys(processedOutput).length
        ? processedOutput
        : rawOutput;
    useEffect(() => {
        if (timeHistory) {
            const accChart = drawGraph(
                rawOutput,
                processedOutput,
                types.DataType.accelerations,
                accCanvas,
            );
            const velChart = drawGraph(
                rawOutput,
                processedOutput,
                types.DataType.velocities,
                velCanvas,
            );
            const dispChart = drawGraph(
                rawOutput,
                processedOutput,
                types.DataType.displacements,
                dispCanvas,
            );

            return () => {
                accChart?.destroy();
                velChart?.destroy();
                dispChart?.destroy();
            };
        }
    });

    return (
        <div className="container">
            <span>
                <btn.DownloadExcelButton
                    onClick={() => downloadTimeSeries(selectedOutput)}
                >
                    Zaman Serilerini İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-80">
                <canvas id="accChart" ref={accCanvas} />
            </div>
            <div className="h-80">
                <canvas id="velChart" ref={velCanvas} />
            </div>
            <div className="h-80">
                <canvas id="dispChart" ref={dispCanvas} />
            </div>
        </div>
    );
};
