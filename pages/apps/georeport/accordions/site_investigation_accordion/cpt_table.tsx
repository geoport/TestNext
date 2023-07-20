import React, { useContext } from 'react';
import CptForm from 'forms/georeport/cpt_form';
import { AddRowButton } from 'components/elements/Buttton';
import { TableCreator } from 'components/elements/Table';
import DataContext from '../../context';

const CptTable = () => {
    const { data, setData } = useContext(DataContext);

    const form = new CptForm({});
    const removeRow = (rowIndex: number) => {
        const siteInvestigationData = data.siteInvestigationData;
        const cptData = siteInvestigationData.cptData;
        if (cptData.length > 1) {
            cptData.splice(rowIndex, 1);
            siteInvestigationData.cptData = cptData;
            setData({
                ...data,
                siteInvestigationData: siteInvestigationData,
            });
        }
    };
    const addLayer = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const cptData = data.siteInvestigationData.cptData;
        cptData.push({ depth: undefined, coneResistance: undefined });
        siteInvestigationData.cptData = cptData;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    const handleChange = (e: any, rowIndex: number) => {
        const id = e.target.id;
        const value = e.target.value;

        const siteInvestigationData = data.siteInvestigationData;
        const cptLog = {
            ...siteInvestigationData.cptData[rowIndex],
            [id]: value,
        };
        siteInvestigationData.cptData[rowIndex] = cptLog;

        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const columnTitles = ['Derinlik (m)', 'Koni Uç Direnci (MPa)'];
    const columnIDs = ['depth', 'coneResistance'];

    return (
        <div className="mt-3">
            <TableCreator
                columnTitles={columnTitles}
                columnIDs={columnIDs}
                dataSource={data.siteInvestigationData.cptData}
                form={form}
                handleChange={handleChange}
                handleRemove={removeRow}
                tableID="cptTable"
            />
            <AddRowButton onClick={addLayer} />
        </div>
    );
};

export default CptTable;
