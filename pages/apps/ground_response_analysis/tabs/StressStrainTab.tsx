import DataContext from '../context';
import React, { useContext, useRef, useEffect } from 'react';
import { getTimeSeriesGraphConfig } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import * as tab from 'components/elements/Tab';
import * as dg from 'lib/apps/ground_response_analysis/draw_graph';
import * as inputTypes from 'types/ground_response_analysis/input_types';
import * as apiTypes from 'types/ground_response_analysis/api_types';

export default function StressStrainTab() {
    const { output } = useContext(DataContext);
    const outputMotions = output.outputMotions;

    return (
        <tab.TabWrapper>
            <tab.TabBar>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <tab.TabLink
                            key={`stress_strain_tab_${index}`}
                            title={`#${index + 1}`}
                        />
                    );
                })}
            </tab.TabBar>
            <tab.TabContentWrapper>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <SingleStressStrainTab
                            key={`stress_strain_content_${index}`}
                            outputMotion={outputMotions[`Record${index + 1}`]}
                            index={index}
                        />
                    );
                })}
            </tab.TabContentWrapper>
        </tab.TabWrapper>
    );
}

function SingleStressStrainTab(props: {
    outputMotion: apiTypes.TimeHistory;
    index: number;
}) {
    const { outputMotion, index } = props;
    const stressCanvas = useRef<HTMLCanvasElement>(null);
    const strainCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (outputMotion) {
            const stressChart = drawGraph(
                outputMotion,
                inputTypes.DataTypes.stresses,
                stressCanvas,
            );
            const strainChart = drawGraph(
                outputMotion,
                inputTypes.DataTypes.strains,
                strainCanvas,
            );

            return () => {
                stressChart?.destroy();
                strainChart?.destroy();
            };
        }
    });

    return (
        <tab.TabContent id={`stress_strain_tab_${index}`}>
            <div className="h-96">
                <canvas id="stressChart" ref={stressCanvas} />
            </div>
            <div className="h-96">
                <canvas id="strainChart" ref={strainCanvas} />
            </div>
        </tab.TabContent>
    );
}

const drawGraph = (
    outputMotion: apiTypes.TimeHistory,
    dataType: inputTypes.DataTypes,
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    let label = '';
    if (dataType == inputTypes.DataTypes.stresses) {
        label = 'Kayma Gerilimi Oranı';
    } else {
        label = 'Kesme Deformasyonu (%)';
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');

    const graphData = dg.createStressStrainData(outputMotion, dataType);
    const config = getTimeSeriesGraphConfig(graphData, label);

    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};
