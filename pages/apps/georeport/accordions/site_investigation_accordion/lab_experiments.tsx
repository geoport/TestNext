import React, { useContext } from 'react';
import * as fields from 'components/elements/FormFields';
import * as tab from 'components/elements/Tab';
import { initialState } from 'types/georeport/initial_state';
import * as btn from 'components/elements/Buttton';
import LabExperimentsForm from 'forms/georeport/lab_experiments_form';
import DataContext from '../../context';
import { InputData } from 'types/georeport/input_types';

export default function LabExperiments() {
    const { data, setData } = useContext(DataContext);

    const form = new LabExperimentsForm();
    const experiments = data.siteInvestigationData.labExperiments;
    return (
        <div>
            <tab.TabWrapper vertical={true}>
                <tab.TabBar vertical={true}>
                    {experiments.map((_, index) => {
                        return (
                            <tab.TabLink title={`#${index + 1}`} key={index} />
                        );
                    })}
                    <AddExperimentButton
                        data={data}
                        setData={setData}
                        experimentIndex={0}
                    />
                </tab.TabBar>
                <tab.TabContentWrapper>
                    {experiments.map((_, index) => {
                        return (
                            <tab.TabContent id={`exp_${index + 1}`} key={index}>
                                <Experiment
                                    data={data}
                                    setData={setData}
                                    experimentIndex={index}
                                    form={form}
                                />
                            </tab.TabContent>
                        );
                    })}
                </tab.TabContentWrapper>
            </tab.TabWrapper>
        </div>
    );
}
type ButtonProps = {
    data: InputData;
    setData: Function;
    experimentIndex: number;
};

const AddExperimentButton = ({ data, setData }: ButtonProps) => {
    const addLayer = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const labExperiments = siteInvestigationData.labExperiments;
        labExperiments.push(
            initialState.inputData.siteInvestigationData.labExperiments[0],
        );
        siteInvestigationData.labExperiments = labExperiments;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    return <btn.AddRowButton onClick={addLayer} />;
};

const RemoveExperimentButton = ({
    data,
    setData,
    experimentIndex,
}: ButtonProps) => {
    const removeExperiment = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const labExperiments = siteInvestigationData.labExperiments;
        labExperiments.splice(experimentIndex, 1);
        siteInvestigationData.labExperiments = labExperiments;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    return <btn.DeleteTabButton onClick={removeExperiment} />;
};

const MoveExperimentUpButton = ({
    data,
    setData,
    experimentIndex,
}: ButtonProps) => {
    const moveExperimentUp = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const currentExperiment =
            siteInvestigationData.labExperiments[experimentIndex];
        const prevExperiment =
            siteInvestigationData.labExperiments[experimentIndex - 1];
        siteInvestigationData.labExperiments[experimentIndex] = prevExperiment;
        siteInvestigationData.labExperiments[experimentIndex - 1] =
            currentExperiment;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    return <btn.MoveUpButton onClick={moveExperimentUp} />;
};

const MoveExperimentDownButton = ({
    data,
    setData,
    experimentIndex,
}: ButtonProps) => {
    const moveExperimentDown = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const currentExperiment =
            siteInvestigationData.labExperiments[experimentIndex];
        const nextLayer =
            siteInvestigationData.labExperiments[experimentIndex + 1];
        siteInvestigationData.labExperiments[experimentIndex] = nextLayer;
        siteInvestigationData.labExperiments[experimentIndex + 1] =
            currentExperiment;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    return <btn.MoveDownButton onClick={moveExperimentDown} />;
};

type ExperimentProps = {
    data: InputData;
    setData: Function;
    experimentIndex: number;
    form: LabExperimentsForm;
};
function Experiment({ data, setData, experimentIndex, form }: ExperimentProps) {
    const handleChange = (e: any) => {
        const id = e.target.id;
        const value = e.target.value;

        const siteInvestigationData = data.siteInvestigationData;
        const labExperiments = siteInvestigationData.labExperiments;
        const updatedExperiment = {
            ...labExperiments[experimentIndex],
            [id]: value,
        };
        labExperiments[experimentIndex] = updatedExperiment;
        siteInvestigationData.labExperiments = labExperiments;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const activeExperiment =
        data.siteInvestigationData.labExperiments[experimentIndex];
    const numberOfExperiments =
        data.siteInvestigationData.labExperiments.length;

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <fields.InputField
                    formField={form.boreholeNo}
                    value={activeExperiment['boreholeNo']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.depth}
                    value={activeExperiment['depth']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.naturalUnitWeight}
                    value={activeExperiment['naturalUnitWeight']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.cohesion}
                    value={activeExperiment['cohesion']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.frictionAngle}
                    value={activeExperiment['frictionAngle']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.fineContent}
                    value={activeExperiment['fineContent']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.liquidLimit}
                    value={activeExperiment['liquidLimit']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.plasticLimit}
                    value={activeExperiment['plasticLimit']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.plasticityIndex}
                    value={activeExperiment['plasticityIndex']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.waterContent}
                    value={activeExperiment['waterContent']}
                    onChange={handleChange}
                />
                <fields.InputField
                    formField={form.soilClass}
                    value={activeExperiment['soilClass']}
                    onChange={handleChange}
                />
            </div>
            <div className="float-right mt-3 grid grid-cols-3 gap-2">
                {experimentIndex > 0 && (
                    <MoveExperimentUpButton
                        data={data}
                        setData={setData}
                        experimentIndex={experimentIndex}
                    />
                )}
                {numberOfExperiments != experimentIndex + 1 && (
                    <MoveExperimentDownButton
                        data={data}
                        setData={setData}
                        experimentIndex={experimentIndex}
                    />
                )}
                {numberOfExperiments > 1 && (
                    <RemoveExperimentButton
                        data={data}
                        setData={setData}
                        experimentIndex={experimentIndex}
                    />
                )}
            </div>
        </div>
    );
}
