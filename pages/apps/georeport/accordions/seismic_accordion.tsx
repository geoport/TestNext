import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import SeismicForm from 'forms/georeport/seismic_form';
import { useContext } from 'react';
import DataContext from '../context';
import * as tbl from 'components/elements/Table';
import { useState } from 'react';
import Modal from 'components/modals/modal';
import { SubmitButton, BorderButton } from 'components/elements/Buttton';
import { FormField } from 'models/FormField';

export default function SeismicAccordion() {
    const { analysisOptions, data, setData } = useContext(DataContext);
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const seismicData = { ...data.seismicData, [name_]: value || '' };
        setData({
            ...data,
            seismicData: seismicData,
        });
    };
    const [coordinateModalContent, setCoordinateModalContent] = useState({
        latitude: '',
        longitude: '',
        show: false,
    });

    const isHidden = !(
        analysisOptions.structuralInformationPage ||
        analysisOptions.designSpectrumAnalysis ||
        analysisOptions.liquefactionAnalysis
    );

    const handleListChange = (e: any, id: string) => {
        const seismicData = { ...data.seismicData, [id]: e.value };
        setData({
            ...data,
            seismicData: seismicData,
        });
    };

    const handleFetch = async () => {
        if (
            coordinateModalContent.latitude &&
            coordinateModalContent.longitude
        ) {
            const response = await fetch('/api/apps/get_spectral_values', {
                method: 'POST',
                body: JSON.stringify({
                    latitude: coordinateModalContent.latitude,
                    longitude: coordinateModalContent.longitude,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            const output = JSON.parse(json.message);
            const seismicData = { ...data.seismicData, ...output };
            setData({
                ...data,
                seismicData: seismicData,
            });
            setCoordinateModalContent({
                ...coordinateModalContent,
                show: false,
            });
        }
    };
    const showCoordinateModal = () => {
        setCoordinateModalContent({ ...coordinateModalContent, show: true });
    };
    const form = new SeismicForm({});
    return (
        <Accordion
            title="Deprem Parametreleri"
            hidden={isHidden}
            id="seismicData"
        >
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.dyhd}
                    selected={data.seismicData.dyhd}
                    setSelected={(e) => handleListChange(e, 'dyhd')}
                />
                <fields.ListBox
                    formField={form.localSoilClass}
                    selected={data.seismicData.localSoilClass}
                    setSelected={(e) => handleListChange(e, 'localSoilClass')}
                    hide={analysisOptions.localSoilClassAnalysis}
                />
                <fields.InputField
                    formField={form.earthquakeMagnitude}
                    onChange={handleInputChange}
                    value={data.seismicData.earthquakeMagnitude}
                />
            </div>
            <div className="mt-3 mb-2">
                <tbl.Table>
                    <tbl.TableHead>
                        <tr>
                            <tbl.Th>Dyhd</tbl.Th>
                            <tbl.Th>
                                S<sub>S</sub>
                            </tbl.Th>
                            <tbl.Th>
                                S<sub>1</sub>
                            </tbl.Th>
                            <tbl.Th>PGA(g)</tbl.Th>
                        </tr>
                    </tbl.TableHead>
                    <tbody>
                        <tr>
                            <tbl.Td>DD-1</tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.SS_DD1}
                                    onChange={handleInputChange}
                                    value={data.seismicData.SS_DD1}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.S1_DD1}
                                    onChange={handleInputChange}
                                    value={data.seismicData.S1_DD1}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.PGA_DD1}
                                    onChange={handleInputChange}
                                    value={data.seismicData.PGA_DD1}
                                />
                            </tbl.Td>
                        </tr>
                        <tr>
                            <tbl.Td>DD-2</tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.SS_DD2}
                                    onChange={handleInputChange}
                                    value={data.seismicData.SS_DD2}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.S1_DD2}
                                    onChange={handleInputChange}
                                    value={data.seismicData.S1_DD2}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.PGA_DD2}
                                    onChange={handleInputChange}
                                    value={data.seismicData.PGA_DD2}
                                />
                            </tbl.Td>
                        </tr>
                        <tr>
                            <tbl.Td>DD-3</tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.SS_DD3}
                                    onChange={handleInputChange}
                                    value={data.seismicData.SS_DD3}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.S1_DD3}
                                    onChange={handleInputChange}
                                    value={data.seismicData.S1_DD3}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.PGA_DD3}
                                    onChange={handleInputChange}
                                    value={data.seismicData.PGA_DD3}
                                />
                            </tbl.Td>
                        </tr>
                        <tr>
                            <tbl.Td>DD-4</tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.SS_DD4}
                                    onChange={handleInputChange}
                                    value={data.seismicData.SS_DD4}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.S1_DD4}
                                    onChange={handleInputChange}
                                    value={data.seismicData.S1_DD4}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <fields.InputField
                                    formField={form.PGA_DD4}
                                    onChange={handleInputChange}
                                    value={data.seismicData.PGA_DD4}
                                />
                            </tbl.Td>
                        </tr>
                    </tbody>
                </tbl.Table>
            </div>
            <BorderButton onClick={showCoordinateModal}>
                Afad Verilerini Yükle
            </BorderButton>
            <CoordinateModal
                modalContent={coordinateModalContent}
                setModalContent={setCoordinateModalContent}
                onSubmit={handleFetch}
            />
        </Accordion>
    );
}

function CoordinateModal(props: {
    modalContent: {
        latitude: string;
        longitude: string;
        show: boolean;
    };
    setModalContent: Function;
    onSubmit: () => Promise<void>;
}) {
    const { modalContent, setModalContent, onSubmit } = props;

    const closeModal = () => {
        setModalContent({
            ...modalContent,
            show: false,
        });
    };
    function handleChange(e: any) {
        setModalContent({
            ...modalContent,
            [e.target.name]: e.target.value,
        });
    }
    const latitude = new FormField({
        id: 'latitude',
        label: 'Enlem',
    });
    const longitude = new FormField({
        id: 'longitude',
        label: 'Boylam',
    });

    return (
        <Modal showModal={modalContent.show} closeModal={closeModal}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
                <div className="w-96 space-y-5 rounded bg-white p-2">
                    <div className="my-3 flex justify-between p-3 text-gray-700">
                        <h1 className="text-xl font-semibold">
                            Enlem ve Boylamı Giriniz
                        </h1>
                        <button
                            className="text-md font-extrabold"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                    <hr className="text-gray-300" />
                    <div className="grid grid-cols-2 gap-2">
                        <fields.InputField
                            formField={latitude}
                            onChange={handleChange}
                            value={modalContent.latitude}
                        />
                        <fields.InputField
                            formField={longitude}
                            onChange={handleChange}
                            value={modalContent.longitude}
                        />
                    </div>
                    <hr className="text-gray-300" />
                    <div className="p-3 text-right">
                        <SubmitButton onClick={onSubmit}>Yükle</SubmitButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
