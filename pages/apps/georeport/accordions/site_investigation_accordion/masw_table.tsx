import React, { useContext } from 'react';
import MaswForm from 'forms/georeport/masw_form';
import { AddRowButton } from 'components/elements/Buttton';
import { TableCreator } from 'components/elements/Table';
import DataContext from '../../context';

const MaswTable = () => {
    const { data, setData } = useContext(DataContext);

    const form = new MaswForm({});
    const removeRow = (rowIndex: number) => {
        const siteInvestigationData = data.siteInvestigationData;
        const maswData = siteInvestigationData.maswData;
        if (maswData.length > 1) {
            maswData.splice(rowIndex, 1);
            siteInvestigationData.maswData = maswData;
            setData({
                ...data,
                siteInvestigationData: siteInvestigationData,
            });
        }
    };
    const addLayer = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const maswData = data.siteInvestigationData.maswData;
        maswData.push({
            thickness: undefined,
            shearWaveVelocity: undefined,
            compressionalWaveVelocity: undefined,
        });
        siteInvestigationData.maswData = maswData;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    const handleChange = (e: any, rowIndex: number) => {
        const id = e.target.id;
        const value = e.target.value;

        const siteInvestigationData = data.siteInvestigationData;
        const maswLog = {
            ...siteInvestigationData.maswData[rowIndex],
            [id]: value,
        };
        siteInvestigationData.maswData[rowIndex] = maswLog;

        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const columnTitles = [
        'Katman Kalınlığı(m)',
        'Kayma Dalgası Hızı(m/s)',
        'P Dalgası Hızı(m/s)',
    ];
    const columnIDs = [
        'thickness',
        'shearWaveVelocity',
        'compressionalWaveVelocity',
    ];

    return (
        <div className="mt-3">
            <TableCreator
                columnTitles={columnTitles}
                columnIDs={columnIDs}
                dataSource={data.siteInvestigationData.maswData}
                form={form}
                handleChange={handleChange}
                handleRemove={removeRow}
                tableID="maswTable"
            />
            <AddRowButton onClick={addLayer} />
        </div>
    );
};

export default MaswTable;
