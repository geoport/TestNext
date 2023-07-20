import * as fields from 'components/elements/FormFields';
import FileForm from 'forms/seismic_analysis/file_form';
import DataContext from '../context';
import React, { useContext } from 'react';
import { getSelected } from 'lib/helper';
import { FormField } from 'models/FormField';
import * as types from 'types/seismic_analysis/input_types';

type ListFieldProps = {
    formField: FormField;
    inputData: types.InputData;
    handleInputChange: (e: any) => void;
};
const ListField = (props: ListFieldProps) => {
    const { formField, inputData, handleInputChange } = props;
    const id = formField.id;
    let hide = false;
    const value = inputData[id as keyof types.InputData];
    if (id !== 'dataType') {
        switch (inputData.dataType) {
            case 'acc':
                hide = id !== 'accUnit';
                break;
            case 'vel':
                hide = id !== 'velUnit';
                break;
            case 'disp':
                hide = id !== 'dispUnit';
                break;
            default:
                break;
        }
    }
    return (
        <fields.ListBox
            formField={formField}
            selected={getSelected(formField, value as string)}
            setSelected={(e) =>
                handleInputChange({ target: { name: id, value: e.value } })
            }
            hide={hide}
        />
    );
};
export default function FileTab() {
    const { inputData, handleInputChange } = useContext(DataContext);
    const form = new FileForm();
    return (
        <div className="mt-3 grid grid-cols-2 gap-2">
            <fields.FileField formField={form.file} index="" />
            <div></div>
            <fields.InputField
                formField={form.firstRowNo}
                value={inputData.firstRowNo as number}
                onChange={handleInputChange}
            />
            <fields.InputField
                formField={form.lastRowNo}
                value={inputData.lastRowNo as number}
                onChange={handleInputChange}
            />
            <fields.InputField
                formField={form.timeStep}
                value={inputData.timeStep as number}
                onChange={handleInputChange}
            />
            <fields.InputField
                formField={form.scaleFactor}
                value={inputData.scaleFactor as number}
                onChange={handleInputChange}
            />
            <ListField
                formField={form.dataType}
                inputData={inputData}
                handleInputChange={handleInputChange}
            />
            <ListField
                formField={form.accUnit}
                inputData={inputData}
                handleInputChange={handleInputChange}
            />
            <ListField
                formField={form.velUnit}
                inputData={inputData}
                handleInputChange={handleInputChange}
            />
            <ListField
                formField={form.dispUnit}
                inputData={inputData}
                handleInputChange={handleInputChange}
            />
        </div>
    );
}
