import React, { useRef, useEffect, useContext, useState } from 'react';
import * as btn from 'components/elements/Buttton';
import * as dg from 'lib/apps/ground_response_analysis/draw_graph';
import { getSpectraGraphConfig, legendPositions } from 'lib/apps/graph_configs';
import Chart from 'chart.js/auto';
import DataContext from '../context';
import * as excel from 'lib/apps/ground_response_analysis/generate_excel';
import * as types from 'types/ground_response_analysis/api_types';
import * as tab from '../../../../components/elements/TabsAlternative';

export default function ResponseSpectraTab() {
    const { output } = useContext(DataContext);
    const inputMotions = output.inputMotions;
    const outputMotions = output.outputMotions;
    const [openTab, setOpenTab] = useState(0);
    return (
        <tab.TabContainer>
            <tab.TabBar>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <tab.TabLink
                            key={`response_spectra_tab_${index}`}
                            id={`response_spectra_tab_${index}`}
                            isActive={openTab === index}
                            setOpenTab={setOpenTab}
                            tabIndex={index}
                        />
                    );
                })}
                <tab.TabLink
                    id={`average_response_spectra_tab`}
                    isActive={false}
                    setOpenTab={setOpenTab}
                    tabIndex={Object.values(outputMotions).length}
                    title="Yüzey Tepki Spektrumları"
                />
            </tab.TabBar>
            <tab.TabContentContainer>
                {Object.values(outputMotions).map((_, index) => {
                    return (
                        <SingleResponseSpectraTab
                            key={`response_spectra_content_${index}`}
                            outputMotion={outputMotions[`Record${index + 1}`]}
                            inputMotion={inputMotions[`Record${index + 1}`]}
                            index={index}
                            openTab={openTab}
                        />
                    );
                })}
                <AverageResponseSpectraTab
                    outputMotions={outputMotions}
                    openTab={openTab}
                />
            </tab.TabContentContainer>
        </tab.TabContainer>
    );
}

function SingleResponseSpectraTab(props: {
    inputMotion: types.TimeHistory;
    outputMotion: types.TimeHistory;
    index: number;
    openTab: number;
}) {
    const { inputMotion, outputMotion, index, openTab } = props;
    const saCanvas = useRef<HTMLCanvasElement>(null);
    const periods = outputMotion.periods;
    const inputSA = inputMotion.spectralAccelerations;
    const outputSA = outputMotion.spectralAccelerations;
    useEffect(() => {
        if (inputMotion && saCanvas.current) {
            const graphData = dg.createResponseSpectraData(
                periods,
                inputSA,
                outputSA,
            );
            const config = getSpectraGraphConfig(
                graphData,
                'Periyod (s)',
                'Spektral İvme(g)',
                legendPositions.top,
            );

            const ctx = saCanvas.current.getContext('2d');
            if (!ctx) return;
            const saChart = new Chart(ctx, config);

            return () => {
                saChart.destroy();
            };
        }
    }, [inputMotion, outputMotion, saCanvas]);

    return (
        <tab.TabContent
            id={`response_spectra_tab_${index}`}
            isActive={openTab === index}
        >
            <span>
                <btn.DownloadExcelButton
                    onClick={() =>
                        excel.downloadSingleResponseSpectra(
                            inputSA,
                            outputSA,
                            periods,
                            index,
                        )
                    }
                >
                    Tepki Spektrumlarını İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-96">
                <canvas id={`saChart_${index}`} ref={saCanvas} />
            </div>
        </tab.TabContent>
    );
}

function AverageResponseSpectraTab({
    outputMotions,
    openTab,
}: {
    outputMotions: types.OutputMotion;
    openTab: number;
}) {
    const saCanvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (outputMotions['Record1']) {
            const graphData =
                dg.createAverageResponseSpectraData(outputMotions);
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
        }
    });

    return (
        <tab.TabContent
            id={`average_response_spectra_tab`}
            isActive={openTab === Object.values(outputMotions).length}
        >
            <span>
                <btn.DownloadExcelButton
                    onClick={() =>
                        excel.downloadAverageResponseSpectra(outputMotions)
                    }
                >
                    Tepki Spektrumlarını İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-96">
                <canvas id="saAvgChart" ref={saCanvas} />
            </div>
        </tab.TabContent>
    );
}
