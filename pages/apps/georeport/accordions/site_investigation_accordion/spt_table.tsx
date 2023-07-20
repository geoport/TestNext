import React, { useContext } from 'react';
import * as fields from 'components/elements/FormFields';
import SptForm from 'forms/georeport/spt_form';
import { AddRowButton } from 'components/elements/Buttton';
import { TableCreator } from 'components/elements/Table';
import DataContext from '../../context';

const SptTable = () => {
    const { data, setData } = useContext(DataContext);
    const form = new SptForm({});
    const removeRow = (rowIndex: number) => {
        const siteInvestigationData = data.siteInvestigationData;
        const sptData = siteInvestigationData.sptData;
        const log = sptData.log;
        if (log.length > 1) {
            log.splice(rowIndex, 1);
            sptData.log = log;
            siteInvestigationData.sptData = sptData;
            setData({
                ...data,
                siteInvestigationData: siteInvestigationData,
            });
        }
    };

    const addLayer = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const sptData = data.siteInvestigationData.sptData;
        const log = sptData.log;
        log.push({ depth: undefined, N: undefined });
        sptData.log = log;
        siteInvestigationData.sptData = sptData;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const handleChange = (e: any, rowIndex: number) => {
        const id = e.target.id;
        const value = e.target.value;

        const siteInvestigationData = data.siteInvestigationData;
        const sptData = siteInvestigationData.sptData;
        const log = { ...sptData.log[rowIndex], [id]: value };
        sptData.log[rowIndex] = log;
        siteInvestigationData.sptData = sptData;

        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    const handleCorrectionChange = (e: any) => {
        const id = e.target.id;
        const value = e.target.value as number;
        const checked = e.target.checked as boolean;

        const siteInvestigationData = data.siteInvestigationData;
        let sptData = siteInvestigationData.sptData;
        if (id === 'makeCorrection') {
            sptData.makeCorrection = checked;
        } else {
            sptData = { ...sptData, [id]: value };
        }
        siteInvestigationData.sptData = sptData;

        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const columnTitles = ['Derinlik (m)', 'Vuruş Sayısı'];
    const columnIDs = ['depth', 'N'];

    return (
        <div className="mt-3">
            <div className="mb-3 grid grid-cols-2 gap-3 px-5">
                <div className="mr-16">
                    <fields.InputField
                        formField={form.energyCorrectionFactor}
                        onChange={handleCorrectionChange}
                        value={
                            data.siteInvestigationData.sptData[
                                'energyCorrectionFactor'
                            ]
                        }
                    />
                    <fields.InputField
                        formField={form.diameterCorrectionFactor}
                        onChange={handleCorrectionChange}
                        value={
                            data.siteInvestigationData.sptData[
                                'diameterCorrectionFactor'
                            ]
                        }
                    />
                    <fields.InputField
                        formField={form.samplerCorrectionFactor}
                        onChange={handleCorrectionChange}
                        value={
                            data.siteInvestigationData.sptData[
                                'samplerCorrectionFactor'
                            ]
                        }
                    />
                    <div className="mt-3">
                        <fields.BooleanField
                            formField={form.makeCorrection}
                            checked={
                                data.siteInvestigationData.sptData
                                    .makeCorrection
                            }
                            setChecked={handleCorrectionChange}
                        />
                    </div>
                </div>
                <CorrectionFactorTable />
            </div>
            <TableCreator
                columnTitles={columnTitles}
                columnIDs={columnIDs}
                dataSource={data.siteInvestigationData.sptData.log}
                form={form}
                handleChange={handleChange}
                handleRemove={removeRow}
                tableID="sptTable"
            />
            <AddRowButton onClick={addLayer} />
        </div>
    );
};

const CorrectionFactorTable = () => {
    return (
        <table className="table border-collapse border border-slate-500">
            <colgroup span={3}></colgroup>

            <thead className="h-10 border text-center">
                <tr>
                    <th className="border border-slate-600" scope="col">
                        Düzeltme Katsayısı
                    </th>
                    <th className="border border-slate-600" scope="col">
                        Değişken
                    </th>
                    <th className="border border-slate-600" scope="col">
                        Değer
                    </th>
                </tr>
            </thead>

            <tbody className="text-center">
                <tr>
                    <th
                        className="border border-slate-600"
                        rowSpan={4}
                        scope="rowgroup"
                    >
                        C<sub>R</sub>
                    </th>
                    <th className="border border-slate-600" scope="row">
                        3m ile 4m arasında
                    </th>
                    <td className="border border-slate-600">0.75</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        4m ile 6m arasında
                    </th>
                    <td className="border border-slate-600">0.85</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        6m ile 10m arasında
                    </th>
                    <td className="border border-slate-600">0.95</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        10m&apos;den derin
                    </th>
                    <td className="border border-slate-600">1.00</td>
                </tr>
            </tbody>

            <tbody className="text-center">
                <tr>
                    <th
                        className="border border-slate-600"
                        rowSpan={2}
                        scope="rowgroup"
                    >
                        C<sub>S</sub>
                    </th>
                    <th className="border border-slate-600" scope="row">
                        Standart numune alıcı(iç tüpü olan)
                    </th>
                    <td className="border border-slate-600">1.00</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        İç tüpü olmayan numune alıcı
                    </th>
                    <td className="border border-slate-600">1.10-1.30</td>
                </tr>
            </tbody>

            <tbody className="text-center">
                <tr>
                    <th
                        className="border border-slate-600"
                        rowSpan={3}
                        scope="rowgroup"
                    >
                        C<sub>B</sub>
                    </th>
                    <th className="border border-slate-600" scope="row">
                        Çap 65mm-115mm arasında
                    </th>
                    <td className="border border-slate-600">1.00</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        Çap 150mm
                    </th>
                    <td className="border border-slate-600">1.05</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        Çap 200mm
                    </th>
                    <td className="border border-slate-600">1.15</td>
                </tr>
            </tbody>

            <tbody className="text-center">
                <tr>
                    <th
                        className="border border-slate-600"
                        rowSpan={3}
                        scope="rowgroup"
                    >
                        C<sub>E</sub>
                    </th>
                    <th className="border border-slate-600" scope="row">
                        Güvenli tokmak
                    </th>
                    <td className="border border-slate-600">0.60-1.17</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        Halkalı tokmak
                    </th>
                    <td className="border border-slate-600">0.45-1.00</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" scope="row">
                        Otomatik darbeli tokmak
                    </th>
                    <td className="border border-slate-600">0.90-1.60</td>
                </tr>
            </tbody>
        </table>
    );
};

export default SptTable;
