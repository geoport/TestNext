import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import createMapList from 'lib/create_map';
import * as tab from 'components/elements/Tab';
import SoilClassMap from 'data/soil_classes.json';
import { initialState } from 'types/georeport/initial_state';
import SoilProfileForm from 'forms/georeport/soil_profile_form';
import * as btn from 'components/elements/Buttton';
import { getSoilProfileRequirements } from 'lib/apps/georeport/get_required_fields';
import { useContext } from 'react';
import DataContext from '../context';
import { InputData, AnalysisOptions } from 'types/georeport/input_types';
import { SoilLayerData } from 'types/soil_profile';
import { FormField } from 'models/FormField';
import {
    getSoilParamLimits,
    getSoilParamDefinition,
} from '@/lib/apps/get_soil_param';
import { CorrelationPopover } from 'components/popovers/Correlation/CorrelationPopovers';

export default function SoilProfileAccordion() {
    const { analysisOptions, data, setData } = useContext(DataContext);
    const soilProfile = data.soilProfile;
    const layers = soilProfile.layers;

    const handleChange = (e: any) => {
        const { id, value, checked } = e.target;
        let soilProfile_ = data.soilProfile;
        if (id === 'gwt') {
            soilProfile_.gwt = value;
        } else {
            soilProfile_ = { ...soilProfile_, [id]: checked };
        }
        setData({
            ...data,
            soilProfile: soilProfile_,
        });
    };

    const form = new SoilProfileForm({});

    return (
        <Accordion id="soilProfile" title="Zemin Profili">
            <div
                style={{
                    display: analysisOptions.localSoilClassAnalysis
                        ? ''
                        : 'none',
                }}
            >
                <fields.BooleanField
                    checked={soilProfile.checkThickClayLayer}
                    setChecked={handleChange}
                    formField={form.checkThickClayLayer}
                />
                <fields.BooleanField
                    checked={soilProfile.checkHighPlasticityClayContent}
                    setChecked={handleChange}
                    formField={form.checkHighPlasticityClayContent}
                />
                <fields.BooleanField
                    checked={soilProfile.checkSoftClayContent}
                    setChecked={handleChange}
                    formField={form.checkSoftClayContent}
                />
                <fields.BooleanField
                    checked={soilProfile.checkSensitiveClayContent}
                    setChecked={handleChange}
                    formField={form.checkSensitiveClayContent}
                />
            </div>
            <hr className="mb-3 mt-3" />
            <div
                className="mb-5"
                style={{
                    display: analysisOptions.settlementAnalysis ? '' : 'none',
                }}
            >
                <fields.BooleanField
                    checked={soilProfile.extendSoilProfile as boolean}
                    formField={form.extendSoilProfile}
                    setChecked={handleChange}
                />
            </div>
            <fields.BooleanField
                checked={soilProfile.noGWT as boolean}
                formField={form.noGWT}
                setChecked={handleChange}
            />
            <div
                className="mt-2 max-w-fit"
                style={{ display: soilProfile.noGWT ? 'none' : '' }}
            >
                <fields.InputField
                    formField={form.gwt}
                    onChange={handleChange}
                    value={soilProfile.gwt}
                />
            </div>
            <hr className="mb-5 mt-5" />
            <tab.TabWrapper vertical={true}>
                <tab.TabBar vertical={true}>
                    {layers.map((layer, index) => {
                        return (
                            <tab.TabLink
                                title={`${index + 1}.Tabaka`}
                                key={index}
                            />
                        );
                    })}
                    <AddLayerButton data={data} setData={setData} />
                </tab.TabBar>
                <tab.TabContentWrapper>
                    {layers.map((layer, index) => {
                        return (
                            <tab.TabContent
                                id={`layer_${index + 1}`}
                                key={index}
                            >
                                <SoilLayer
                                    data={data}
                                    setData={setData}
                                    layerIndex={index}
                                    analysisOptions={analysisOptions}
                                />
                            </tab.TabContent>
                        );
                    })}
                </tab.TabContentWrapper>
            </tab.TabWrapper>
        </Accordion>
    );
}

const AddLayerButton = (props: { data: InputData; setData: Function }) => {
    const { data, setData } = props;
    const addLayer = () => {
        const soilProfile = data.soilProfile;
        soilProfile.layers.push(initialState.inputData.soilProfile.layers[0]);
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <btn.AddRowButton onClick={addLayer} />;
};

const RemoveLayerButton = (props: {
    data: InputData;
    setData: Function;
    layerIndex: number;
}) => {
    const { data, setData, layerIndex } = props;
    const removeLayer = () => {
        const soilProfile = data.soilProfile;
        soilProfile.layers.splice(layerIndex, 1);
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <btn.DeleteTabButton onClick={removeLayer} />;
};

const MoveLayerUpButton = (props: {
    data: InputData;
    setData: Function;
    layerIndex: number;
}) => {
    const { data, setData, layerIndex } = props;

    const moveLayerUp = () => {
        const soilProfile = data.soilProfile;
        const currentLayer = soilProfile.layers[layerIndex];
        const prevLayer = soilProfile.layers[layerIndex - 1];
        soilProfile.layers[layerIndex] = prevLayer;
        soilProfile.layers[layerIndex - 1] = currentLayer;
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <btn.MoveUpButton onClick={moveLayerUp} />;
};

const MoveLayerDownButton = (props: {
    data: InputData;
    setData: Function;
    layerIndex: number;
}) => {
    const { data, setData, layerIndex } = props;

    const moveLayerDown = () => {
        const soilProfile = data.soilProfile;
        const currentLayer = soilProfile.layers[layerIndex];
        const nextLayer = soilProfile.layers[layerIndex + 1];
        soilProfile.layers[layerIndex] = nextLayer;
        soilProfile.layers[layerIndex + 1] = currentLayer;
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <btn.MoveDownButton onClick={moveLayerDown} />;
};

const SoilField = (props: {
    formField: FormField;
    layerData: SoilLayerData;
    handleChange: (e: any) => void;
}) => {
    const { formField, layerData, handleChange } = props;
    const limitVals = getSoilParamLimits(
        layerData.soilClass as string,
        formField.id,
    );
    const handleCorrelationSubmit = (value: string) => {
        handleChange({ target: { value: value, id: formField.id } });
    };
    const content = (
        <CorrelationPopover
            id={formField.id}
            onSubmit={handleCorrelationSubmit}
            soilClass={layerData.soilClass as string}
        />
    );

    const result = CorrelationPopover({
        id: formField.id,
        onSubmit: () => {},
        soilClass: layerData.soilClass as string,
    });

    return (
        <fields.SoilInputField
            formField={formField}
            value={
                layerData[formField.id as keyof SoilLayerData] as
                    | string
                    | number
            }
            onChange={handleChange}
            hide={
                !(formField.required == undefined ? true : formField.required)
            }
            limitVals={limitVals}
            definition={getSoilParamDefinition(formField.id)}
            correlationContent={result.type === 'div' ? undefined : content}
        />
    );
};

function SoilLayer(props: {
    data: InputData;
    setData: Function;
    layerIndex: number;
    analysisOptions: AnalysisOptions;
}) {
    const { data, setData, layerIndex, analysisOptions } = props;
    const handleChange = (e: any) => {
        const id = e.target.id;
        const value = e.target.value;

        const soilProfile = { ...data.soilProfile };
        const layer = { ...soilProfile.layers[layerIndex], [id]: value };
        soilProfile.layers[layerIndex] = layer;

        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    const handleListChange = (id: string, e: any) => {
        const soilProfile = { ...data.soilProfile };
        const layer = { ...soilProfile.layers[layerIndex], [id]: e.value };
        if (id === 'soilClass') {
            const soilDefinition =
                SoilClassMap.soilDefinitions[
                    e.value as keyof typeof SoilClassMap.soilDefinitions
                ][0];
            layer.soilDefinition = soilDefinition;
        }
        soilProfile.layers[layerIndex] = layer;
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };

    const layerData = data.soilProfile.layers[layerIndex];
    const activeSoilClass = (layerData.soilClass ||
        'GW') as keyof typeof SoilClassMap.soilDefinitions;

    function getDefinitions() {
        return createMapList(SoilClassMap.soilDefinitions[activeSoilClass]);
    }

    const numberOfLayers = data.soilProfile.layers.length;
    const requiredFields = getSoilProfileRequirements(
        analysisOptions,
        layerData,
    );
    const form = new SoilProfileForm(requiredFields);
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.soilClass}
                    selected={activeSoilClass}
                    setSelected={(e) => handleListChange('soilClass', e)}
                />
                <fields.ListBox
                    formField={form.soilDefinition}
                    selected={layerData.soilDefinition}
                    setSelected={(e) => handleListChange('soilDefinition', e)}
                    dynamicChoices={getDefinitions()}
                    hide={!requiredFields.soilDefinition}
                />
                <SoilField
                    formField={form.soilClassManual}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.soilDefinitionManual}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <fields.ListBox
                    formField={form.geologicTexture}
                    selected={layerData.geologicTexture}
                    setSelected={(e) => handleListChange('geologicTexture', e)}
                    hide={!requiredFields.geologicTexture}
                />
                <SoilField
                    formField={form.dryUnitWeight}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.saturatedUnitWeight}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.thickness}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.elasticModulus}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.poissonRatio}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.volumeCompressibilityCoefficient}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.voidRatio}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.compressionIndex}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.recompressionIndex}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.preconsolidationPressure}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.undrainedShearStrength}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.cohesion}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.frictionAngle}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.RQD}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.IS50}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.kp}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.shearWaveVelocity}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.fineContent}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.liquidLimit}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.plasticityIndex}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.plasticLimit}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.waterContent}
                    handleChange={handleChange}
                    layerData={layerData}
                />
            </div>
            <div className="float-right mt-3 grid grid-cols-3 gap-2">
                {layerIndex > 0 && (
                    <MoveLayerUpButton
                        data={data}
                        setData={setData}
                        layerIndex={layerIndex}
                    />
                )}
                {numberOfLayers != layerIndex + 1 && (
                    <MoveLayerDownButton
                        data={data}
                        setData={setData}
                        layerIndex={layerIndex}
                    />
                )}
                {numberOfLayers > 1 && (
                    <RemoveLayerButton
                        data={data}
                        setData={setData}
                        layerIndex={layerIndex}
                    />
                )}
            </div>
        </div>
    );
}
