import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import RecordForm from 'forms/ground_response_analysis/record_form';
import SeismicForm from 'forms/ground_response_analysis/seismic_form';
import FileForm from 'forms/ground_response_analysis/file_form';
import { getSelected, readFile } from 'lib/helper';
import * as button from 'components/elements/Buttton';
import * as tab from 'components/elements/Tab';
import DataContext from '../context';
import React, { useContext, useState } from 'react';
import { fileValidation } from 'forms/ground_response_analysis/form_validation';
import { Dialog } from '@headlessui/react';
import EarthquakeSelectionPage from '../../earthquake_selection';
import Modal from 'components/modals/modal';
import { initialState } from '../../../../types/ground_response_analysis/initial_state';
import * as inputTypes from 'types/ground_response_analysis/input_types';
import * as selectionTypes from 'types/earthquake_selection/api_types';

export default function RecordAccordion() {
    const { data, handleInputChange, setData, setErrorModalContent } =
        useContext(DataContext);
    const [showEqSelectionModal, setShowEqSelectionModal] = useState(false);
    const recordForm = new RecordForm(data.giveReport);
    const seismicForm = new SeismicForm(data.giveReport);
    const fileForm = new FileForm();
    const records = data.recordData;
    async function downloadRecordCallback(
        outputData: selectionTypes.OutputData,
        spectraType: string,
    ) {
        const recordList = getRecords(outputData, spectraType);
        const newRecords = [...records, ...recordList];
        setData({ ...data, recordData: newRecords });
        setShowEqSelectionModal(false);
    }
    return (
        <Accordion id="recordData" title="Deprem Parametreleri">
            <div className="mb-3 grid grid-cols-2 gap-2">
                <fields.InputField
                    formField={seismicForm.SS}
                    onChange={handleInputChange}
                    value={data.SS as number}
                    hide={!data.giveReport}
                />
                <fields.InputField
                    formField={seismicForm.S1}
                    onChange={handleInputChange}
                    value={data.S1 as number}
                    hide={!data.giveReport}
                />
                <fields.ListBox
                    formField={seismicForm.dyhd}
                    selected={getSelected(seismicForm.dyhd, data.dyhd)}
                    setSelected={(e) =>
                        handleInputChange({
                            target: { name: 'dyhd', value: e.value },
                        })
                    }
                    hide={!data.giveReport}
                />
                <fields.ListBox
                    formField={recordForm.surfaceSpectraMethod}
                    selected={getSelected(
                        recordForm.surfaceSpectraMethod,
                        data.surfaceSpectraMethod,
                    )}
                    setSelected={(e) =>
                        handleInputChange({
                            target: {
                                name: 'surfaceSpectraMethod',
                                value: e.value,
                            },
                        })
                    }
                    hide={!data.giveReport}
                />
                {data.giveReport && <div></div>}
            </div>
            <tab.TabWrapper vertical={true}>
                <tab.TabBar vertical={true}>
                    {records.map((_: any, index: any) => {
                        return (
                            <tab.TabLink title={`#${index + 1}`} key={index} />
                        );
                    })}
                    <AddRecordButton data={data} setData={setData} />
                </tab.TabBar>
                <tab.TabContentWrapper>
                    {records.map((_: any, index: any) => {
                        return (
                            <tab.TabContent
                                id={`record_${index + 1}`}
                                key={`${index}_tab`}
                            >
                                <SingleRecord
                                    data={data}
                                    setData={setData}
                                    recordIndex={index}
                                    recordForm={recordForm}
                                    fileForm={fileForm}
                                    setErrorModalContent={setErrorModalContent}
                                />
                            </tab.TabContent>
                        );
                    })}
                </tab.TabContentWrapper>
            </tab.TabWrapper>
            <div className="mt-5 flex justify-end">
                <button.BorderButton
                    onClick={() => setShowEqSelectionModal(true)}
                >
                    Otomatik Deprem Seçimi Yap
                </button.BorderButton>
            </div>
            {showEqSelectionModal && (
                <EarthquakeSelectionModal
                    showModal={showEqSelectionModal}
                    setShowModal={setShowEqSelectionModal}
                    downloadRecordCallback={downloadRecordCallback}
                />
            )}
        </Accordion>
    );
}

type RecordButtonProps = {
    data: inputTypes.InputData;
    setData: (data: inputTypes.InputData) => void;
    recordIndex?: number;
};

const AddRecordButton = (props: RecordButtonProps) => {
    const { data, setData } = props;
    const addRecord = () => {
        const recordData = data.recordData;
        recordData.push(initialState.recordData[0]);
        setData({
            ...data,
            recordData: recordData,
        });
    };
    return <button.AddRowButton onClick={addRecord} />;
};

const RemoveRecordButton = (props: RecordButtonProps) => {
    const { data, setData, recordIndex } = props;
    const removeRecord = () => {
        const recordData = data.recordData;
        recordData.splice(recordIndex as number, 1);
        setData({
            ...data,
            recordData: recordData,
        });
    };
    return <button.DeleteTabButton onClick={removeRecord} />;
};

type SingleRecordProps = {
    data: inputTypes.InputData;
    setData: (data: inputTypes.InputData) => void;
    recordForm: RecordForm;
    fileForm: FileForm;
    recordIndex: number;
    setErrorModalContent: (content: {
        title: string;
        content: string;
        show: boolean;
    }) => void;
};
function SingleRecord(props: SingleRecordProps) {
    const {
        data,
        setData,
        recordForm,
        fileForm,
        recordIndex,
        setErrorModalContent,
    } = props;
    const handleFileUpload = async () => {
        const recordData = [...data.recordData];
        const record = { ...recordData[recordIndex] };
        const input = document.getElementById(
            `file${recordIndex + 1}`,
        ) as HTMLInputElement;
        const isValid = fileValidation(input, record, setErrorModalContent);
        if (!isValid) return;

        const file = input.files?.[0] as File;
        const accelerations = await readFile(file);

        record.accelerations = accelerations
            .filter(Boolean)
            .slice(
                (record.firstRowNo as number) - 1,
                record.lastRowNo as number,
            );
        recordData[recordIndex] = record;

        setData({
            ...data,
            recordData: recordData,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id as keyof inputTypes.Record;
        const value = e.target.value;

        const recordData = [...data.recordData];
        const record = { ...recordData[recordIndex], [id]: value };
        recordData[recordIndex] = record;

        setData({
            ...data,
            recordData: recordData,
        });
    };

    const handleListChange = (id: keyof inputTypes.Record, e: any) => {
        const recordData = [...data.recordData];
        const record = { ...recordData[recordIndex], [id]: e.value };
        recordData[recordIndex] = record;
        setData({
            ...data,
            recordData: recordData,
        });
    };

    const record = data.recordData[recordIndex];
    const numberOfRecords = data.recordData.length;

    return (
        <div>
            <tab.TabWrapper>
                <tab.TabBar>
                    <tab.TabLink title={`Dosya Bilgileri`} />
                    <tab.TabLink
                        title={`Deprem Bilgileri`}
                        hide={!data.giveReport}
                    />
                    <tab.TabLink title={`İvme Değerleri`} hide={false} />
                </tab.TabBar>
                <tab.TabContentWrapper>
                    <tab.TabContent id={`record_${recordIndex + 1}_fileTab`}>
                        <div className="mb-3 grid grid-cols-2 gap-2">
                            <fields.FileField
                                formField={fileForm.file}
                                index={`${recordIndex + 1}`}
                            />
                            <fields.ListBox
                                formField={fileForm.unit}
                                selected={getSelected(
                                    fileForm.unit,
                                    record.unit,
                                )}
                                setSelected={(e) => handleListChange('unit', e)}
                            />
                            <fields.InputField
                                formField={fileForm.firstRowNo}
                                value={record.firstRowNo as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={fileForm.lastRowNo}
                                value={record.lastRowNo as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={fileForm.timeStep}
                                value={record.timeStep as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={fileForm.scaleFactor}
                                value={record.scaleFactor as number}
                                onChange={handleChange}
                            />
                        </div>
                        <button.BorderButton onClick={handleFileUpload}>
                            Dosya Yükle
                        </button.BorderButton>
                    </tab.TabContent>
                    <tab.TabContent id={`record_${recordIndex + 1}_eqTab`}>
                        <div className="grid grid-cols-2 gap-2">
                            <fields.InputField
                                formField={recordForm.eventName}
                                value={record.eventName}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={recordForm.stationName}
                                value={record.stationName}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={recordForm.year}
                                value={record.year as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={recordForm.Mw}
                                value={record.Mw as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={recordForm.pga}
                                value={record.pga as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={recordForm.Rrup}
                                value={record.Rrup as number}
                                onChange={handleChange}
                            />
                            <fields.InputField
                                formField={recordForm.VS30}
                                value={record.VS30 as number}
                                onChange={handleChange}
                            />
                            <fields.ListBox
                                formField={recordForm.faultType}
                                selected={getSelected(
                                    recordForm.faultType,
                                    record.faultType,
                                )}
                                setSelected={(e) =>
                                    handleListChange('faultType', e)
                                }
                            />
                        </div>
                    </tab.TabContent>
                    <tab.TabContent id={`record_${recordIndex + 1}_graphTab`}>
                        <div className="h-64 overflow-y-scroll">
                            <table className="table-auto border-collapse border border-slate-500">
                                <thead className="border">
                                    <tr>
                                        <th className="border border-slate-600 px-4 py-2">
                                            #
                                        </th>
                                        <th className="border border-slate-600 px-4 py-2">
                                            Zaman(s)
                                        </th>
                                        <th className="border border-slate-600 px-4 py-2">
                                            İvme(g)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.accelerations.map((acc, index) => {
                                        return (
                                            <tr key={`${index}_row`}>
                                                <td className="border border-slate-600 px-4 py-2 text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="border border-slate-600 px-4 py-2 text-center">
                                                    {index *
                                                        (record.timeStep as number)}
                                                </td>
                                                <td className="border border-slate-600 px-4 py-2 text-center">
                                                    {acc}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </tab.TabContent>
                </tab.TabContentWrapper>
            </tab.TabWrapper>

            <div className="float-right mt-3">
                {numberOfRecords > 1 && (
                    <RemoveRecordButton
                        data={data}
                        setData={setData}
                        recordIndex={recordIndex}
                    />
                )}
            </div>
        </div>
    );
}

type SelectionModalProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    downloadRecordCallback: Function;
};
function EarthquakeSelectionModal(props: SelectionModalProps) {
    const { showModal, setShowModal, downloadRecordCallback } = props;
    function closeModal() {
        setShowModal(false);
    }
    return (
        <Modal showModal={showModal} closeModal={closeModal}>
            <Dialog.Panel className="h-screen w-full max-w-full transform overflow-auto bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                    <button
                        className="text-md font-extrabold"
                        onClick={closeModal}
                    >
                        X
                    </button>
                </div>
                <EarthquakeSelectionPage
                    appName="ground_response_analysis"
                    downloadRecordCallback={downloadRecordCallback}
                />
            </Dialog.Panel>
        </Modal>
    );
}

const createRecordMap = (
    recordData: selectionTypes.EqRecord,
    direction: string,
): inputTypes.Record => {
    let accelerations, pga;
    switch (direction) {
        case 'EW':
            accelerations = recordData.accelerationsEW;
            pga = recordData.pgaEW;
            break;
        case 'NS':
            accelerations = recordData.accelerationsNS;
            pga = recordData.pgaNS;
            break;
        default:
            accelerations = recordData.accelerations;
            pga = recordData.pga;
            break;
    }
    return {
        unit: 'g',
        firstRowNo: 1,
        lastRowNo: undefined,
        timeStep: recordData.timeStep,
        scaleFactor: recordData.scaleFactor,
        eventName: recordData.eventName,
        stationName: recordData.stationName,
        year: recordData.year,
        Mw: recordData.Mw,
        pga: pga,
        Rrup: recordData.Rrup,
        VS30: recordData.VS30,
        faultType: recordData.faultType,
        accelerations: accelerations,
    };
};

const getRecords = (
    outputData: selectionTypes.OutputData,
    spectraType: string,
): inputTypes.Record[] => {
    const records = outputData.selectedRecords;
    const transformedRecords: inputTypes.Record[] = [];
    for (const key of Object.keys(records)) {
        const record = records[key];
        if (spectraType === 'H' || spectraType === 'V') {
            transformedRecords.push(createRecordMap(record, ''));
        } else {
            transformedRecords.push(createRecordMap(record, 'EW'));
            transformedRecords.push(createRecordMap(record, 'NS'));
        }
    }
    return transformedRecords;
};
