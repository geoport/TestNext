import { Accordion } from 'components/elements/Accordion';
import * as tab from 'components/elements/Tab';
import FieldExperiments from './site_investigation_accordion/field_experiments';
import LabExperiments from './site_investigation_accordion/lab_experiments';
import { useContext } from 'react';
import DataContext from '../context';

export default function SiteInvestigationAccordion() {
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

    const showAccordion =
        showSPT || showCPT || showPressureMeter || showMASW || showGeneralInfo;

    return (
        <Accordion
            id="investigationData"
            title="Mevcut Zemin Araştırmaları"
            hidden={!showAccordion}
        >
            <tab.TabWrapper>
                <tab.TabBar>
                    <tab.TabLink title="Saha Deneyleri" />
                    <tab.TabLink
                        title="Laboratuvar Deneyleri"
                        hide={!showGeneralInfo}
                    />
                </tab.TabBar>
                <tab.TabContentWrapper>
                    <tab.TabContent id="field-experiments-tab">
                        <FieldExperiments />
                    </tab.TabContent>
                    <tab.TabContent id="lab-experiments-tab">
                        <LabExperiments />
                    </tab.TabContent>
                </tab.TabContentWrapper>
            </tab.TabWrapper>
        </Accordion>
    );
}
