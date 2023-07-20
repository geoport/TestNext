import React, { useEffect, useRef, useState, useContext } from 'react';
import { Chart } from 'chart.js/auto';
import * as btn from 'components/elements/Buttton';
import { getSpectraGraphConfig } from 'lib/apps/graph_configs';
import createGraphData from 'lib/apps/earthquake_selection/draw_graph';
import { BooleanField } from 'components/elements/FormFields';
import { Dialog } from '@headlessui/react';
import * as alerts from 'components/elements/Alerts';
import * as gf from 'lib/apps/earthquake_selection/generate_files';
import DataContext from '../context';
import Modal from 'components/modals/modal';
import * as inputTypes from 'types/earthquake_selection/input_types';
import * as apiTypes from 'types/earthquake_selection/api_types';

export default function OutputTab() {
    const { data, setData, output, downloadRecordCallback } =
        useContext(DataContext);
    const [activeGmpModal, setActiveGmpModal] = useState(-1);
    const records = output.selectedRecords;
    const handleDownloadRecords = () => {
        if (downloadRecordCallback) {
            downloadRecordCallback(output, data.spectraType);
        } else {
            gf.generateRecordZip(output, data.spectraType);
        }
    };

    return Object.keys(records).length > 0 ? (
        <>
            <Graph outputData={output} />
            <hr className="mt-3 bg-gray-50" />
            <RecordTable
                outputData={output}
                inputData={data}
                setInputData={setData}
                setActiveGmpModal={setActiveGmpModal}
            />
            <div className="align-center flex">
                <btn.BorderButton onClick={() => handleDownloadRecords()}>
                    Deprem Kayıtlarını İndir
                </btn.BorderButton>
                <btn.DownloadExcelButton
                    onClick={() => gf.generateMetaData(output)}
                >
                    Deprem Verilerini İndir
                </btn.DownloadExcelButton>
            </div>
            {Object.keys(records).map((recordName, index) => {
                return (
                    <GmpModal
                        showModal={activeGmpModal === index}
                        setActiveGmpModal={setActiveGmpModal}
                        recordData={records[recordName]}
                        key={`modal_${index}`}
                        spectraType={data.spectraType}
                    />
                );
            })}
        </>
    ) : (
        <alerts.ErrorMessage message="Belirlenen kriterlerde deprem kaydı bulunamadı." />
    );
}

const Graph = ({ outputData }: { outputData: apiTypes.OutputData }) => {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (outputData.targetSpectra && canvasEl.current) {
            const ctx = canvasEl.current.getContext('2d');
            if (ctx) {
                const graphData = createGraphData(outputData);
                const config = getSpectraGraphConfig(
                    graphData,
                    'Periyod (s)',
                    'Spektral İvme (g)',
                );
                const MyAccTimeChart = new Chart(ctx, config);

                return function cleanup() {
                    MyAccTimeChart.destroy();
                };
            }
        }
    }, [outputData.targetSpectra]);

    return (
        <div className="container">
            <span>
                <btn.DownloadExcelButton
                    onClick={() => gf.generateSpectralAccelerations(outputData)}
                >
                    Tepki Spektrumlarını İndir
                </btn.DownloadExcelButton>
            </span>
            <div className="h-96">
                <canvas id="myChart" ref={canvasEl} />
            </div>
        </div>
    );
};

type TableProps = {
    inputData: inputTypes.InputData;
    setInputData: Function;
    outputData: apiTypes.OutputData;
    setActiveGmpModal: (index: number) => void;
};
const RecordTable = (props: TableProps) => {
    const { inputData, setInputData, outputData, setActiveGmpModal } = props;
    const records = outputData.selectedRecords;
    const onChecked = (e: any, index: number) => {
        const recordsToDownload = inputData.recordsToDownload;
        recordsToDownload[`Record${index + 1}`] = e.target.checked;
        setInputData({ ...inputData, recordsToDownload });
    };
    const requiredRecordNumber = inputData.requiredRecordNumber;
    const recordCount = Object.keys(records).length;
    return (
        <div className="relative mb-5 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
            {recordCount < requiredRecordNumber && (
                <div className="mb-5">
                    <alerts.WarningMessage message="Belirtilen kriterlerde yeterli sayıda kayıt bulunamadı." />
                </div>
            )}
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-2 py-3 text-center text-white">#</th>
                        <th className="py-3 text-center text-white">İndir</th>
                        <th className="py-3 text-center text-white">RSN</th>
                        <th className="py-3 text-center text-white">
                            Ölçeklendirme
                            <br />
                            Katsayısı
                        </th>
                        <th className="py-3 text-center text-white">
                            Deprem Adı
                        </th>
                        <th className="py-3 text-center text-white">
                            İstasyon Adı
                        </th>
                        <th className="py-3 text-center text-white">
                            Deprem Yılı
                        </th>
                        <th className="py-3 text-center text-white">
                            Deprem
                            <br />
                            Büyüklüğü
                        </th>
                        <th className="py-3 text-center text-white">
                            VS<sub>30</sub>(m/s)
                        </th>
                        <th className="py-3 text-center text-white">
                            Fay Tipi
                        </th>
                        <th className="py-3 text-center text-white">
                            Fay Uzaklığı
                            <br />
                            (km)
                        </th>
                        <th className="py-3 text-center text-white">
                            Kayıt Aralığı
                            <br />
                            (s)
                        </th>
                        <th className="py-3 text-center text-white">
                            Yer Hareketi
                            <br />
                            Parametreleri
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(records).map((recordName, index) => {
                        const record = records[recordName];
                        return (
                            <tr
                                key={index}
                                className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                            >
                                <td className="py-4 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-4 text-center">
                                    <BooleanField
                                        formField={{ id: `download_${index}` }}
                                        checked={
                                            inputData.recordsToDownload[
                                                `Record${index + 1}`
                                            ]
                                        }
                                        setChecked={(e) => onChecked(e, index)}
                                    />
                                </td>
                                <td className="py-4 text-center">
                                    {record.RSN}
                                </td>
                                <td className="py-4 text-center">
                                    {record.scaleFactor.toFixed(3)}
                                </td>
                                <td className="py-4 text-center">
                                    {record.eventName}
                                </td>
                                <td className="py-4 text-center">
                                    {record.stationName}
                                </td>
                                <td className="py-4 text-center">
                                    {record.year}
                                </td>
                                <td className="py-4 text-center">
                                    {record.Mw}
                                </td>
                                <td className="py-4 text-center">
                                    {record.VS30}
                                </td>
                                <td className="py-4 text-center">
                                    {record.faultType}
                                </td>
                                <td className="py-4 text-center">
                                    {record.Rrup}
                                </td>
                                <td className="py-4 text-center">
                                    {record.timeStep}
                                </td>
                                <td className="py-4 text-center">
                                    <button
                                        className="content-center"
                                        onClick={() => setActiveGmpModal(index)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

type ModalProps = {
    showModal: boolean;
    setActiveGmpModal: React.Dispatch<React.SetStateAction<number>>;
    recordData: apiTypes.EqRecord;
    spectraType: string;
};
function GmpModal(props: ModalProps) {
    const { showModal, setActiveGmpModal, recordData, spectraType } = props;
    function closeModal() {
        setActiveGmpModal(-1);
    }

    return (
        <Modal showModal={showModal} closeModal={closeModal}>
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                {spectraType === 'H' || spectraType === 'V' ? (
                    <SingleComponentTable recordData={recordData} />
                ) : (
                    <MultipleComponentTable recordData={recordData} />
                )}
            </Dialog.Panel>
        </Modal>
    );
}

const MultipleComponentTable = ({
    recordData,
}: {
    recordData: apiTypes.EqRecord;
}) => {
    return (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="py-3"></th>
                    <th className="py-3 text-center text-white">
                        Doğu-Batı Kaydı
                    </th>
                    <th className="py-3 text-center text-white">
                        Kuzey-Güney Kaydı
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-4 text-center">Dosya Adı</td>
                    <td className="py-4 text-center">
                        {recordData.fileNameEW}
                    </td>
                    <td className="py-4 text-center">
                        {recordData.fileNameNS}
                    </td>
                </tr>
                <tr>
                    <td className="py-4 text-center">PGA(g)</td>
                    <td className="py-4 text-center">
                        {recordData.pgaEW.toFixed(5)}
                    </td>
                    <td className="py-4 text-center">
                        {recordData.pgaNS.toFixed(5)}
                    </td>
                </tr>
                <tr>
                    <td className="py-4 text-center">Arias Yoğunluğu</td>
                    <td className="py-4 text-center">
                        {recordData.aiEW.toFixed(5)}
                    </td>
                    <td className="py-4 text-center">
                        {recordData.aiNS.toFixed(5)}
                    </td>
                </tr>
                <tr>
                    <td className="py-4 text-center">Baskın Periyod(s)</td>
                    <td className="py-4 text-center">
                        {recordData.ppEW.toFixed(2)}
                    </td>
                    <td className="py-4 text-center">
                        {recordData.ppNS.toFixed(2)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const SingleComponentTable = ({
    recordData,
}: {
    recordData: apiTypes.EqRecord;
}) => {
    return (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <tbody>
                <tr>
                    <td className="py-4 text-center">Dosya Adı</td>
                    <td className="py-4 text-center">{recordData.fileName}</td>
                </tr>
                <tr>
                    <td className="py-4 text-center">PGA(g)</td>
                    <td className="py-4 text-center">
                        {recordData.pga.toFixed(5)}
                    </td>
                </tr>
                <tr>
                    <td className="py-4 text-center">Arias Yoğunluğu</td>
                    <td className="py-4 text-center">
                        {recordData.ai.toFixed(5)}
                    </td>
                </tr>
                <tr>
                    <td className="py-4 text-center">Baskın Periyod(s)</td>
                    <td className="py-4 text-center">
                        {recordData.pp.toFixed(2)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
