import { BooleanField, RadioButton } from 'components/elements/FormFields';
import { FormField } from 'models/FormField';
import createMapList from '@/lib/create_map';
import { BorderButton } from 'components/elements/Buttton';
import { ErrorMessage } from 'components/elements/Alerts';
import { useState } from 'react';

type InputField = {
    label: string;
    id: string;
    unit?: string;
};
export const Correlation = (props: {
    inputData: any;
    setData: Function;
    setSelectedFields: Function;
    inputFields: InputField[];
    selectedFields: any;
    onSubmit?: (output: any) => void;
    calcOutput: (inputData: any) => any;
    extraValidation?: (inputData: any) => string;
    showOutput?: boolean;
    outputElement?: JSX.Element;
    abbreviation?: string;
    outputUnit?: string;
}) => {
    const selectedValue = new FormField({
        id: 'selectedValue',
        label: 'Kullanılacak Değer',
        choices: createMapList(['minimum', 'ortalama']),
    });
    const [error, setError] = useState('');
    const [output, setOutput] = useState('');

    const { inputData, selectedFields, setData, setSelectedFields } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...inputData, [id.split('_')[0]]: value });
    };

    const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setSelectedFields({
            ...selectedFields,
            [id]: checked,
        });
        setData({ ...inputData, [id]: '' });
    };

    const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setData({
            ...inputData,
            selectedValue: value,
        });
    };

    const handleSubmit = () => {
        for (const field of props.inputFields) {
            if (selectedFields[field.id as keyof typeof selectedFields]) {
                if (inputData[field.id as keyof typeof inputData] === '') {
                    setError(`${field.label} alanını doldurunuz.`);
                    return;
                }
            }
        }
        if (props.extraValidation) {
            const errorMessage = props.extraValidation(inputData);
            if (errorMessage) {
                setError(errorMessage);
                return;
            }
        }
        setError('');
        const output = props.calcOutput(inputData);
        if (props.onSubmit) {
            props.onSubmit(output);
        }
        setOutput(output);
    };

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="border-r-2">
                <p className="mb-2 font-bold">
                    Kullanılacak Parametreleri Seçiniz
                </p>
                {props.inputFields.map((field) => (
                    <InputField
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        unit={field.unit}
                        value={inputData[field.id as keyof typeof inputData]}
                        handleChange={handleChange}
                        isChecked={
                            selectedFields[
                                field.id as keyof typeof selectedFields
                            ]
                        }
                        handleBooleanChange={handleBooleanChange}
                    />
                ))}
                {error && (
                    <div className="mr-2 mt-2">
                        <ErrorMessage message={error} />
                    </div>
                )}
            </div>
            <div>
                <RadioButton
                    formField={selectedValue}
                    selected={props.inputData.selectedValue}
                    setSelected={handleListChange}
                />
                <hr className="mb-2 mt-2"></hr>
                <BorderButton onClick={handleSubmit}>Hesapla</BorderButton>
                {props.showOutput && output && (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: `${props.abbreviation} = ${output} ${props.outputUnit}`,
                        }}
                        className="mt-6 font-bold"
                    />
                )}
            </div>
        </div>
    );
};

export const InputField = (props: {
    label: string;
    id: string;
    unit?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    handleBooleanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
}) => {
    const booleanField = new FormField({
        id: props.id,
        label: props.label,
    });
    return (
        <div className="mb-2">
            <div className="mb-1">
                <BooleanField
                    formField={booleanField}
                    checked={props.isChecked}
                    setChecked={props.handleBooleanChange}
                />
            </div>
            <div className="w-full text-start">
                <input
                    type="number"
                    name={`${props.id}_field`}
                    id={`${props.id}_field`}
                    value={props.value}
                    onChange={props.handleChange}
                    className="border-black-300 rounded-md border-2 text-center"
                    placeholder={props.unit}
                    disabled={!props.isChecked}
                />
            </div>
        </div>
    );
};
