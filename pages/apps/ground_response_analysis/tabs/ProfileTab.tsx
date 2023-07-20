import DataContext from '../context';
import React, { useContext, useRef, useEffect, useState } from 'react';
import * as btn from 'components/elements/Buttton';
import { getProfileGraphConfig } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import * as tab from '../../../../components/elements/TabsAlternative';
import * as excel from 'lib/apps/ground_response_analysis/generate_excel';
import * as dg from 'lib/apps/ground_response_analysis/draw_graph';
import * as inputTypes from 'types/ground_response_analysis/input_types';
import * as apiTypes from 'types/ground_response_analysis/api_types';

export default function ProfileTab() {
    const { output } = useContext(DataContext);
    const depths = output.rediscretizedSoilProfile.depth;
    const outputMotions = output.outputMotions;
    const [openTab, setOpenTab] = useState(0);

    return (
        <tab.TabContainer>
            <tab.TabBar>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <tab.TabLink
                            key={`profile_tab_${index}`}
                            id={`profile_tab_${index}`}
                            isActive={openTab === index}
                            setOpenTab={setOpenTab}
                            tabIndex={index}
                        />
                    );
                })}
            </tab.TabBar>
            <tab.TabContentContainer>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <SingleProfileTab
                            key={`profile_content_${index}`}
                            outputMotion={outputMotions[`Record${index + 1}`]}
                            depths={depths}
                            index={index}
                            openTab={openTab}
                        />
                    );
                })}
            </tab.TabContentContainer>
        </tab.TabContainer>
    );
}

function SingleProfileTab(props: {
    outputMotion: apiTypes.TimeHistory;
    depths: number[];
    index: number;
    openTab: number;
}) {
    const { outputMotion, index, depths, openTab } = props;
    const pgaCanvas = useRef<HTMLCanvasElement>(null);
    const pgvCanvas = useRef<HTMLCanvasElement>(null);
    const pgdCanvas = useRef<HTMLCanvasElement>(null);
    const strainCanvas = useRef<HTMLCanvasElement>(null);
    const stressCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (outputMotion) {
            const accChart = drawGraph(
                depths,
                outputMotion,
                inputTypes.DataTypes.accelerations,
                pgaCanvas,
            );
            const velChart = drawGraph(
                depths,
                outputMotion,
                inputTypes.DataTypes.velocities,
                pgvCanvas,
                false,
            );
            const dispChart = drawGraph(
                depths,
                outputMotion,
                inputTypes.DataTypes.displacements,
                pgdCanvas,
                false,
            );
            const strainChart = drawGraph(
                depths,
                outputMotion,
                inputTypes.DataTypes.strains,
                strainCanvas,
                false,
            );
            const stressChart = drawGraph(
                depths,
                outputMotion,
                inputTypes.DataTypes.stresses,
                stressCanvas,
                false,
                2,
            );

            return () => {
                accChart?.destroy();
                velChart?.destroy();
                dispChart?.destroy();
                strainChart?.destroy();
                stressChart?.destroy();
            };
        }
    });

    return (
        <tab.TabContent
            id={`profile_tab_${index}`}
            isActive={openTab === index}
        >
            <span>
                <btn.DownloadExcelButton
                    onClick={() =>
                        excel.downloadProfileData(
                            index,
                            depths,
                            outputMotion.pga,
                            outputMotion.pgv,
                            outputMotion.pgd,
                            outputMotion.maxStrain,
                            outputMotion.maxStress,
                        )
                    }
                >
                    Maksimum Değerleri İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="grid grid-cols-5">
                <div className="h-screen">
                    <canvas id="accChart" ref={pgaCanvas} />
                </div>
                <div className="h-screen">
                    <canvas id="velChart" ref={pgvCanvas} />
                </div>
                <div className="h-screen">
                    <canvas id="dispChart" ref={pgdCanvas} />
                </div>
                <div className="h-screen">
                    <canvas id="strainChart" ref={strainCanvas} />
                </div>
                <div className="h-screen">
                    <canvas id="stressChart" ref={stressCanvas} />
                </div>
            </div>
        </tab.TabContent>
    );
}

const drawGraph = (
    depths: number[],
    outputMotion: apiTypes.TimeHistory,
    dataType: inputTypes.DataTypes,
    ref: React.RefObject<HTMLCanvasElement>,
    displayYAxis = true,
    round = 3,
) => {
    let label = '';
    let data = [];
    switch (dataType) {
        case inputTypes.DataTypes.accelerations:
            label = 'PGA (g)';
            data = outputMotion.pga;
            break;
        case inputTypes.DataTypes.velocities:
            label = 'PGV (cm/s)';
            data = outputMotion.pgv;
            break;
        case inputTypes.DataTypes.strains:
            label = 'Max. Strain (%)';
            data = outputMotion.maxStrain;
            break;
        case inputTypes.DataTypes.stresses:
            label = 'Max. Stres (MPa)';
            data = outputMotion.maxStress;
            break;
        default:
            label = 'PGD (cm)';
            data = outputMotion.pgd;
            break;
    }
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');

    const graphData = dg.createProfileData(depths, data);
    const config = getProfileGraphConfig(graphData, label, displayYAxis, round);

    if (!ctx) return;
    const chart = new Chart(ctx, config);

    return chart;
};
