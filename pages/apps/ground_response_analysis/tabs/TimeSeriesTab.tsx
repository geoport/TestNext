import DataContext from '../context';
import React, { useContext, useRef, useEffect, useState } from 'react';
import * as btn from 'components/elements/Buttton';
import { getTimeSeriesGraphConfig } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import * as excel from 'lib/apps/ground_response_analysis/generate_excel';
import * as dg from 'lib/apps/ground_response_analysis/draw_graph';
import * as types from 'types/ground_response_analysis/api_types';
import { DataTypes } from 'types/ground_response_analysis/input_types';
import {
    TabLink,
    TabBar,
    TabContent,
    TabContentContainer,
    TabContainer,
} from '../../../../components/elements/TabsAlternative';

export default function TimeSeriesTab() {
    const { output } = useContext(DataContext);
    const inputMotions = output.inputMotions;
    const outputMotions = output.outputMotions;
    const [openTab, setOpenTab] = useState(0);

    return (
        <TabContainer>
            <TabBar>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <TabLink
                            key={`time_series_tab_${index}`}
                            isActive={openTab === index}
                            setOpenTab={setOpenTab}
                            tabIndex={index}
                            id={`time_series_tab_${index}`}
                        />
                    );
                })}
            </TabBar>
            <TabContentContainer>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <SingleTimeSeriesTab
                            key={`time_series_content_${index}`}
                            outputMotion={outputMotions[`Record${index + 1}`]}
                            inputMotion={inputMotions[`Record${index + 1}`]}
                            index={index}
                            openTab={openTab}
                        />
                    );
                })}
            </TabContentContainer>
        </TabContainer>
    );
}

function SingleTimeSeriesTab(props: {
    inputMotion: types.TimeHistory;
    outputMotion: types.TimeHistory;
    openTab: number;
    index: number;
}) {
    const { inputMotion, outputMotion, index, openTab } = props;
    const accCanvas = useRef<HTMLCanvasElement>(null);
    const velCanvas = useRef<HTMLCanvasElement>(null);
    const dispCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (inputMotion) {
            const accChart = drawGraph(
                inputMotion,
                outputMotion,
                DataTypes.accelerations,
                accCanvas,
            );
            const velChart = drawGraph(
                inputMotion,
                outputMotion,
                DataTypes.velocities,
                velCanvas,
            );
            const dispChart = drawGraph(
                inputMotion,
                outputMotion,
                DataTypes.displacements,
                dispCanvas,
            );

            return () => {
                accChart?.destroy();
                velChart?.destroy();
                dispChart?.destroy();
            };
        }
    }, [index]);

    return (
        <TabContent
            isActive={openTab === index}
            id={`time_series_content_${index}`}
        >
            <span>
                <btn.DownloadExcelButton
                    onClick={() =>
                        excel.downloadTimeSeries(
                            inputMotion,
                            outputMotion,
                            index,
                        )
                    }
                >
                    Zaman Serilerini İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-96">
                <canvas id={'accChart' + index} ref={accCanvas} />
            </div>
            <div className="h-96">
                <canvas id={'velChart' + index} ref={velCanvas} />
            </div>
            <div className="h-96">
                <canvas id={'dispChart' + index} ref={dispCanvas} />
            </div>
        </TabContent>
    );
}

const drawGraph = (
    inputMotion: types.TimeHistory,
    outputMotion: types.TimeHistory,
    dataType: DataTypes,
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    let label = '';
    switch (dataType) {
        case DataTypes.accelerations:
            label = 'İvme (g)';
            break;
        case DataTypes.velocities:
            label = 'Hız (cm/s)';
            break;
        default:
            label = 'Deplasman (cm)';
            break;
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');

    const graphData = dg.createTimeSeriesData(
        inputMotion,
        outputMotion,
        dataType,
    );
    const config = getTimeSeriesGraphConfig(graphData, label);

    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};
