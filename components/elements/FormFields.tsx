import DatePicker from 'react-datepicker';
import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import 'react-datepicker/dist/react-datepicker.css';
import { FormField } from 'models/FormField';
import { string2Date } from '@/lib/helper';
import { HintButton, CorrelationButton } from './Buttton';

/**
 * A reusable label component that renders a label with HTML content.
 *
 * @param label - The label text with HTML content.
 *
 * @returns The JSX element of the label component.
 */
function Label(props: { label: string }) {
    return <label dangerouslySetInnerHTML={{ __html: props.label }} />;
}

/**
 * A reusable input field component that renders an input element with an optional label and hint button.
 *
 * @param formField - An object representing the form field with properties like `id`, `label`, `type`, and `unit`.
 * @param value - The value of the input field.
 * @param onChange - A callback function that is called when the input value changes.
 * @param hide - A boolean flag that indicates whether to hide the input field or not (optional).
 * @param noLabel - A boolean flag that indicates whether to hide the label or not (optional).
 *
 * @returns The JSX element of the input field component.
 */
export function InputField(props: {
    formField: FormField | Record<string, any>;
    value: string | number | undefined;
    onChange: (e: any) => void;
    hide?: boolean;
    noLabel?: boolean;
}): JSX.Element {
    const inputClassName = `
        form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300
        rounded transition ease-in-out m-0 focus:text-gray-700 
        focus:bg-white focus:border-blue-600 focus:outline-none text-center
    `;
    const { formField, value, onChange, hide, noLabel } = props;
    const unit = formField.unit ? `(${formField.unit})` : '';
    const label = formField.label + unit;
    return (
        <div className="form-group" style={{ display: hide ? 'none' : '' }}>
            {formField.label && !noLabel && <Label label={label} />}
            <input
                type={formField.type}
                name={formField.id}
                className={inputClassName}
                id={formField.id}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

/**
 * A reusable input field component for soil params that renders an input element
 * with a label, hint button and warning.
 *
 * @param formField - An object representing the form field with properties like `id`, `label`, `type`, and `unit`.
 * @param value - The value of the input field.
 * @param onChange - A callback function that is called when the input value changes.
 * @param hint - A hint for the input field (optional).
 * @param hide - A boolean flag that indicates whether to hide the input field or not (optional).
 * @param limitVals - List of numbers indicating suggested minimum and maximum values
 * the field should take (optional).
 *
 * @returns The JSX element of the input field component.
 */
export function SoilInputField(props: {
    formField: FormField;
    value: string | number | undefined;
    onChange: (e: any) => void;
    hide?: boolean;
    limitVals?: number[];
    definition?: string;
    correlationContent?: any;
}): JSX.Element {
    const inputClassName = `
        form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300
        rounded transition ease-in-out m-0 focus:text-gray-700 
        focus:bg-white focus:border-blue-600 focus:outline-none text-center
    `;
    const {
        formField,
        value,
        onChange,
        definition,
        hide,
        limitVals,
        correlationContent,
    } = props;
    const unit = formField.unit ? `(${formField.unit})` : '';
    const label = formField.label + unit;
    let showWarning = false;
    if (limitVals?.length == 2 && value != undefined && value != '') {
        const currentVal = value as number;
        if (currentVal < limitVals[0] || currentVal > limitVals[1]) {
            showWarning = true;
        } else {
            showWarning = false;
        }
    } else {
        showWarning = false;
    }
    const HintContent = () => (
        <div>
            <p className="mb-4 text-sm text-gray-500">
                <b>Tanım</b> : {props.definition}
            </p>
            <p className="mb-4 text-sm text-gray-500">
                <b>Önerilen minimum değer</b> :{' '}
                {limitVals?.length == 2 ? limitVals[0] : '-'}
            </p>
            <p className="text-sm text-gray-500">
                <b>Önerilen maksimum değer</b> :{' '}
                {limitVals?.length == 2 ? limitVals[1] : '-'}
            </p>
        </div>
    );

    return (
        <div className="form-group" style={{ display: hide ? 'none' : '' }}>
            <div className="flex">
                {<Label label={label} />}
                {definition && <HintButton hintContent={<HintContent />} />}
                {correlationContent && (
                    <CorrelationButton popoverContent={correlationContent} />
                )}
            </div>
            <input
                type={formField.type}
                name={formField.id}
                className={inputClassName}
                id={formField.id}
                value={value}
                onChange={onChange}
            />
            {showWarning && (
                <div
                    className="mb-2 mt-1 rounded-lg bg-yellow-50 p-2 text-sm text-yellow-800 dark:bg-gray-500 dark:text-yellow-300"
                    role="alert"
                >
                    <span className="font-medium">Uyarı!</span> Girilen değer
                    önerilen aralığın dışında.(Önerilen : {limitVals?.[0]} ~{' '}
                    {limitVals?.[1]})
                </div>
            )}
        </div>
    );
}

/**
 * A component that renders a date and time picker field.
 * This component uses the DatePicker component from the react-datepicker library
 * to allow the user to select a date and time. The selected date and time value is
 * returned to the parent component via the onChange callback.
 * @param formField - The form field object containing the label and ID of the field.
 * @param value - The currently selected date and time value, as a Date object or a string
 * in the format "yyyy-MM-ddTHH:mm:ss.sssZ".
 * @param onChange - A callback function that is called whenever the selected date and time
 * value changes. The new value is passed to the callback function as a Date object.
 *
 * @returns The rendered date and time picker field.
 */
export function DateTimeField(props: {
    formField: FormField;
    value: Date | string | undefined;
    onChange: (e: any) => void;
}): JSX.Element {
    const inputClassName = `
        border text-sm text-gray-700 focus:ring-blue-500 rounded
        block w-full pl-10 p-2 bg-white dark:bg-gray-700 border-gray-300 
        dark:border-gray-300 dark:placeholder-gray-400 dark:text-white 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 
    `;
    const { formField, value, onChange } = props;
    let selectedDate: Date;
    if (value === '' || value === undefined) {
        selectedDate = new Date();
    } else {
        if (typeof value === 'string') {
            selectedDate = string2Date(value);
        } else {
            selectedDate = value;
        }
    }

    return (
        <div className="form-group">
            {formField.label && (
                <label htmlFor={formField.id}>{formField.label}</label>
            )}
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={selectedDate || new Date()}
                onChange={(date) => {
                    onChange(date);
                }}
                className={inputClassName}
                name={formField.id}
            />
        </div>
    );
}

type ListObject = {
    key: string;
    value: string;
};

/**
 * A reusable list box component that renders a list box with an optional label.
 *
 * @param formField - The form field object containing the label and ID of the field.
 * @param dynamicChoices - An array of objects with `key` and `value` properties that
 * represent the choices for the list box (optional).
 * @param selected - The currently selected value.
 * @param setSelected - A callback function that is called when the selected value changes.
 * @param hide - A boolean flag that indicates whether to hide the list box or not (optional).
 * @param multiple - A boolean flag that indicates whether to allow multiple selections or not (optional).
 *
 * @returns The JSX element of the list box component.
 */
export function ListBox(props: {
    formField: FormField;
    dynamicChoices?: any[];
    selected: any;
    setSelected: (e: any) => void;
    hide?: boolean;
    multiple?: boolean;
}): JSX.Element {
    const { formField, dynamicChoices, selected, setSelected, hide, multiple } =
        props;
    const choices = dynamicChoices
        ? dynamicChoices
        : (formField.choices as any[]);
    return (
        <div style={{ display: hide ? 'none' : '' }}>
            {formField.label && <label>{formField.label}</label>}
            <Listbox
                value={selected}
                onChange={setSelected}
                multiple={multiple}
            >
                <div className="border-grey-light mb-4 block rounded border-solid border-gray-300">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        {multiple ? (
                            selected
                                .map((obj: ListObject) => obj.value)
                                .join(', ')
                        ) : (
                            <>
                                <span className="block truncate text-center">
                                    {selected}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </>
                        )}
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            style={{ zIndex: '2' }}
                            className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {choices.map((obj, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-amber-100 text-amber-900'
                                                : 'text-gray-900'
                                        }`
                                    }
                                    value={obj}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {obj.key}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

/**
 * A reusable boolean field component that renders a boolean field with an optional label.
 *
 * @param formField - The form field object containing the label and ID of the field.
 * @param checked - The current value of the boolean.
 * @param setChecked - A callback function that is called when the value changes.
 *
 * @returns The JSX element of the boolean field component.
 */
export function BooleanField(props: {
    formField: FormField;
    checked: boolean;
    setChecked: (e: any) => void;
}) {
    const { formField, checked, setChecked } = props;
    return formField.label ? (
        <div className="flex items-center">
            <input
                checked={checked}
                id={formField.id}
                type="checkbox"
                value=""
                name={formField.id}
                onChange={setChecked}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label
                htmlFor={formField.id}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: formField.label }}
            />
        </div>
    ) : (
        <input
            checked={checked}
            id={formField.id}
            type="checkbox"
            value=""
            name={formField.id}
            onChange={setChecked}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
    );
}

/**
 * A reusable file input component that renders a file input with an optional label and hint button.
 *
 * @param formField - The form field object containing the label and ID of the field.
 * @param index - The index of the field in the form.
 *
 * @returns The JSX element of the file input component.
 */
export function FileField(props: { formField: FormField; index: string }) {
    const { formField, index } = props;
    return (
        <div>
            <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
            >
                {formField.label}
            </label>
            <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none"
                id={formField.id + index}
                type="file"
            />
        </div>
    );
}

/**
 * A reusable radio button component that renders a radio button with an optional label.
 *
 * @param formField - The form field object containing the label and ID of the field.
 * @param selected - The currently selected value.
 * @param setSelected - A callback function that is called when the selected value changes.
 * @param hide - A boolean flag that indicates whether to hide the radio button or not (optional).
 *
 * @returns The JSX element of the radio button component.
 */
export function RadioButton(props: {
    formField: FormField;
    selected: any;
    setSelected: (e: any) => void;
    hide?: boolean;
}): JSX.Element {
    const { formField, selected, setSelected, hide } = props;
    return (
        <div style={{ display: hide ? 'none' : '' }}>
            {formField.label && (
                <label className="font-bold">{formField.label}</label>
            )}
            <div className="flex flex-col space-y-2">
                {formField.choices?.map((obj, _) => (
                    <label
                        htmlFor={obj.value}
                        className="inline-flex items-center"
                        key={obj.value}
                    >
                        <input
                            type="radio"
                            id={obj.value}
                            name="options"
                            value={obj.value}
                            className="form-radio h-4 w-4 text-blue-600"
                            checked={selected === obj.value}
                            onChange={setSelected}
                        />
                        <span className="ml-2">{obj.key}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
