import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import * as tab from 'components/elements/Tab';
import * as types from 'types/ground_response_analysis/input_types';
import SoilProfileForm from 'forms/ground_response_analysis/soil_profile_form';
import * as button from 'components/elements/Buttton';
import { getSelected } from 'lib/helper';
import DataContext from '../context';
import React, { useContext } from 'react';
import { stratifySoilProfile } from 'lib/apps/ground_response_analysis/stratify_soil';
import { FormField } from 'models/FormField';
import {
    getSoilParamDefinition,
    getSoilParamLimits,
} from '@/lib/apps/get_soil_param';
import { initialState } from '../../../../types/ground_response_analysis/initial_state';
import { SoilLayerData } from 'types/soil_profile';

export default function SoilProfileAccordion() {
    const { data, setData, setErrorModalContent } = useContext(DataContext);

    const soilProfile = data.soilProfile;
    const layers = soilProfile.layers;

    const handleChange = (e: any) => {
        const { id, value, checked } = e.target;
        let soilProfile_: types.SoilProfile;
        if (id === 'noBaseRock') {
            soilProfile_ = { ...data.soilProfile, noBaseRock: checked };
        } else {
            soilProfile_ = { ...data.soilProfile, [id]: value };
        }
        setData({
            ...data,
            soilProfile: soilProfile_,
        });
    };

    const stratifySoil = () => {
        for (const layer of data.soilProfile.layers) {
            if (!layer.thickness || layer.thickness == 0) {
                setErrorModalContent({
                    title: 'Zemin Profili',
                    content: 'Tüm tabakaların kalınlığı girilmelidir.',
                    show: true,
                });
                return;
            }
            if (!layer.shearWaveVelocity || layer.shearWaveVelocity == 0) {
                setErrorModalContent({
                    title: 'Zemin Profili',
                    content:
                        'Tüm tabakaların kayma dalgası hızları girilmelidir.',
                    show: true,
                });
                return;
            }
        }
        const newProfile = stratifySoilProfile(data.soilProfile);
        setData({
            ...data,
            soilProfile: newProfile,
        });
    };

    const form = new SoilProfileForm(data.giveReport);

    return (
        <Accordion id="soilProfile" title="Zemin Profili">
            <div
                style={{
                    display: data.giveReport ? '' : 'none',
                }}
            >
                <fields.BooleanField
                    checked={soilProfile.noBaseRock}
                    setChecked={handleChange}
                    formField={form.noBaseRock}
                />
                <div className="mt-3 grid grid-cols-2 gap-2">
                    <fields.ListBox
                        formField={form.localSoilClass}
                        selected={getSelected(
                            form.localSoilClass,
                            soilProfile.localSoilClass,
                        )}
                        setSelected={(e) =>
                            handleChange({
                                target: {
                                    id: 'localSoilClass',
                                    value: e.value,
                                },
                            })
                        }
                    />
                    <fields.ListBox
                        formField={form.rockLSC}
                        selected={getSelected(
                            form.rockLSC,
                            soilProfile.rockLSC,
                        )}
                        setSelected={(e) =>
                            handleChange({
                                target: { id: 'rockLSC', value: e.value },
                            })
                        }
                    />
                    <fields.InputField
                        formField={form.baseRockDepth}
                        value={soilProfile.baseRockDepth}
                        onChange={handleChange}
                        hide={soilProfile.noBaseRock}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <fields.InputField
                    formField={form.gwt}
                    onChange={handleChange}
                    value={soilProfile.gwt}
                />
                <fields.ListBox
                    formField={form.baseRockType}
                    selected={getSelected(
                        form.baseRockType,
                        soilProfile.baseRockType,
                    )}
                    setSelected={(e) =>
                        handleChange({
                            target: { id: 'baseRockType', value: e.value },
                        })
                    }
                />
            </div>
            <hr className="mb-5 mt-5" />
            <div className="mb-3 mt-3 flex justify-end">
                <button.BorderButton onClick={stratifySoil}>
                    Zemin Profilini Tabakalandır
                </button.BorderButton>
            </div>
            <tab.TabWrapper vertical={true}>
                <tab.TabBar vertical={true}>
                    {layers.map((_: any, index: any) => {
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
                    {layers.map((_: any, index: any) => {
                        return (
                            <tab.TabContent
                                id={`layer_${index + 1}`}
                                key={index}
                            >
                                <SoilLayer
                                    data={data}
                                    setData={setData}
                                    layerIndex={index}
                                />
                            </tab.TabContent>
                        );
                    })}
                </tab.TabContentWrapper>
            </tab.TabWrapper>
        </Accordion>
    );
}

type ButtonProps = {
    data: types.InputData;
    setData: (data: types.InputData) => void;
    layerIndex?: number;
};
const AddLayerButton = ({ data, setData }: ButtonProps) => {
    const addLayer = () => {
        const soilProfile = { ...data.soilProfile };
        soilProfile.layers.push(initialState.soilProfile.layers[0]);
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <button.AddRowButton onClick={addLayer} />;
};

const RemoveLayerButton = ({ data, setData, layerIndex }: ButtonProps) => {
    const removeLayer = () => {
        const soilProfile = data.soilProfile;
        soilProfile.layers.splice(layerIndex as number, 1);
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <button.DeleteTabButton onClick={removeLayer} />;
};

const MoveLayerUpButton = ({ data, setData, layerIndex }: ButtonProps) => {
    const moveLayerUp = () => {
        const soilProfile = data.soilProfile;
        const currentLayer = soilProfile.layers[layerIndex as number];
        const prevLayer = soilProfile.layers[(layerIndex as number) - 1];
        soilProfile.layers[layerIndex as number] = prevLayer;
        soilProfile.layers[(layerIndex as number) - 1] = currentLayer;
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <button.MoveUpButton onClick={moveLayerUp} />;
};

const MoveLayerDownButton = ({ data, setData, layerIndex }: ButtonProps) => {
    const moveLayerDown = () => {
        const soilProfile = data.soilProfile;
        const currentLayer = soilProfile.layers[layerIndex as number];
        const nextLayer = soilProfile.layers[(layerIndex as number) + 1];
        soilProfile.layers[layerIndex as number] = nextLayer;
        soilProfile.layers[(layerIndex as number) + 1] = currentLayer;
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };
    return <button.MoveDownButton onClick={moveLayerDown} />;
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
    return (
        <fields.SoilInputField
            formField={formField}
            value={
                layerData[formField.id as keyof SoilLayerData] as
                    | string
                    | number
            }
            onChange={handleChange}
            limitVals={limitVals}
            definition={getSoilParamDefinition(formField.id)}
        />
    );
};

function SoilLayer(props: {
    data: types.InputData;
    setData: (data: types.InputData) => void;
    layerIndex: number;
}) {
    const { data, setData, layerIndex } = props;
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
        soilProfile.layers[layerIndex] = layer;
        setData({
            ...data,
            soilProfile: soilProfile,
        });
    };

    const layerData = data.soilProfile.layers[layerIndex];
    const numberOfLayers = data.soilProfile.layers.length;
    const form = new SoilProfileForm(data.giveReport);

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.soilClass}
                    selected={layerData.soilClass}
                    setSelected={(e) => handleListChange('soilClass', e)}
                />
                <SoilField
                    formField={form.thickness}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.unitWeight}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.shearWaveVelocity}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.plasticityIndex}
                    handleChange={handleChange}
                    layerData={layerData}
                />
                <SoilField
                    formField={form.dampingRatio}
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
