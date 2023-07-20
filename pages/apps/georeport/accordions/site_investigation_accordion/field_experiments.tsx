import React, { useContext } from 'react';
import GeneralParamsForm from './general_params';
import * as tab from 'components/elements/Tab';
import CptTable from './cpt_table';
import PressuremeterTable from './pressuremeter_table';
import MaswTable from './masw_table';
import SptTable from './spt_table';
import DataContext from '../../context';

export default function FieldExperiments() {
    const { analysisOptions } = useContext(DataContext);

    const showSPT =
        analysisOptions.liquefactionBySPT ||
        analysisOptions.localSoilClassBySPT;

    const showCPT = analysisOptions.liquefactionByCPT;

    const showPressureMeter = analysisOptions.bearingCapacityByPressuremeter;
    const showMASW =
        analysisOptions.liquefactionByVS ||
        analysisOptions.localSoilClassByVS ||
        analysisOptions.bearingCapacityByVS;

    const showGeneralInfo = analysisOptions.soilInvestigationPage;

    return (
        <div>
            <tab.TabWrapper>
                <tab.TabBar>
                    <tab.TabLink
                        title="Genel Bilgiler"
                        hide={!showGeneralInfo}
                    />
                    <tab.TabLink
                        title="SPT Verileri"
                        hide={!showSPT}
                    />
                    <tab.TabLink
                        title="CPT Verileri"
                        hide={!showCPT}
                    />
                    <tab.TabLink
                        title="MASW Verileri"
                        hide={!showMASW}
                    />
                    <tab.TabLink
                        title="Presiyometre Verileri"
                        hide={!showPressureMeter}
                    />
                </tab.TabBar>
                <tab.TabContentWrapper>
                    <tab.TabContent
                        id="general-investigation-tab"
                    >
                        <GeneralParamsForm />
                    </tab.TabContent>
                    <tab.TabContent
                        id="SPT-tab"
                    >
                        <SptTable />
                    </tab.TabContent>
                    <tab.TabContent
                        id="CPT-tab"
                    >
                        <CptTable />
                    </tab.TabContent>
                    <tab.TabContent
                        id="MASW-tab"
                    >
                        <MaswTable />
                    </tab.TabContent>
                    <tab.TabContent
                        id="PressureMeter-tab"
                    >
                        <PressuremeterTable />
                    </tab.TabContent>
                </tab.TabContentWrapper>
            </tab.TabWrapper>
        </div>
    );
}
