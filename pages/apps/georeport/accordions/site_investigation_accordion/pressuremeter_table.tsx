import React, { useContext } from 'react';
import PressuremeterForm from 'forms/georeport/pressuremeter_form';
import { AddRowButton } from 'components/elements/Buttton';
import { TableCreator } from 'components/elements/Table';
import DataContext from '../../context';

const PressuremeterTable = () => {
    const { data, setData } = useContext(DataContext);

    const form = new PressuremeterForm({});
    const removeRow = (rowIndex: number) => {
        const siteInvestigationData = data.siteInvestigationData;
        const pressuremeterData = siteInvestigationData.pressuremeterData;
        if (pressuremeterData.length > 1) {
            pressuremeterData.splice(rowIndex, 1);
            siteInvestigationData.pressuremeterData = pressuremeterData;
            setData({
                ...data,
                siteInvestigationData: siteInvestigationData,
            });
        }
    };

    const addLayer = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const pressuremeterData = data.siteInvestigationData.pressuremeterData;
        pressuremeterData.push({
            depth: undefined,
            limitPressure: undefined,
            netLimitPressure: undefined,
        });
        siteInvestigationData.pressuremeterData = pressuremeterData;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const handleChange = (e: any, rowIndex: number) => {
        const id = e.target.id;
        const value = e.target.value;

        const siteInvestigationData = data.siteInvestigationData;
        const pressuremeterLog = {
            ...siteInvestigationData.pressuremeterData[rowIndex],
            [id]: value,
        };
        siteInvestigationData.pressuremeterData[rowIndex] = pressuremeterLog;

        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const columnTitles = [
        'Derinlik',
        <span key="LB">
            Limit Basınç(t/m<sup>2</sup>)
        </span>,
        <span key="NLB">
            Net Limit Basınç(t/m<sup>2</sup>)
        </span>,
    ];
    const columnIDs = ['depth', 'limitPressure', 'netLimitPressure'];

    return (
        <div className="mt-3">
            <TableCreator
                columnTitles={columnTitles}
                columnIDs={columnIDs}
                dataSource={data.siteInvestigationData.pressuremeterData}
                form={form}
                handleChange={handleChange}
                handleRemove={removeRow}
                tableID="pressuremeterTable"
            />
            <AddRowButton onClick={addLayer} />
        </div>
    );
};

export default PressuremeterTable;
