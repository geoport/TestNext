import React, { useContext } from 'react';
import * as fields from 'components/elements/FormFields';
import FieldExperimentsForm from 'forms/georeport/field_experiments_form';
import { AddRowButton } from 'components/elements/Buttton';
import { TableCreator } from 'components/elements/Table';
import DataContext from '../../context';
import { InputData } from 'types/georeport/input_types';

export default function GeneralParamsForm() {
    const { data, setData } = useContext(DataContext);
    const form = new FieldExperimentsForm();

    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const siteInvestigationData = {
            ...data.siteInvestigationData,
            [name_]: value || '',
        };
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const handleDateChange = (date: Date, name_: string) => {
        setData({
            ...data,
            siteInvestigationData: {
                ...data.siteInvestigationData,
                [name_]: date,
            },
        });
    };

    const handleCategoryChange = (e: any) => {
        const siteInvestigationData = {
            ...data.siteInvestigationData,
            investigationCategory: e.value,
        };
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.investigationCategory}
                    selected={data.siteInvestigationData.investigationCategory}
                    setSelected={handleCategoryChange}
                />

                <fields.InputField
                    formField={form.pitNumber}
                    onChange={handleInputChange}
                    value={data.siteInvestigationData.pitNumber}
                />
                <fields.InputField
                    formField={form.totalPitDepth}
                    onChange={handleInputChange}
                    value={data.siteInvestigationData.totalPitDepth}
                />
                <fields.DateTimeField
                    formField={form.investigationDateStart}
                    onChange={(date) =>
                        handleDateChange(date, 'investigationDateStart')
                    }
                    value={
                        data.siteInvestigationData[
                            'investigationDateStart'
                        ] as Date
                    }
                />
                <fields.DateTimeField
                    formField={form.investigationDateFinish}
                    onChange={(date) =>
                        handleDateChange(date, 'investigationDateFinish')
                    }
                    value={
                        data.siteInvestigationData[
                            'investigationDateFinish'
                        ] as Date
                    }
                />
            </div>
            <BoreholeTable data={data} setData={setData} form={form} />
        </div>
    );
}

type BoreholeTableProps = {
    data: InputData;
    setData: Function;
    form: FieldExperimentsForm;
};
const BoreholeTable = (props: BoreholeTableProps) => {
    const { data, setData, form } = props;
    const removeRow = (rowIndex: number) => {
        const siteInvestigationData = data.siteInvestigationData;
        const boreHoleData = siteInvestigationData.boreHoleData;
        if (boreHoleData.length > 1) {
            boreHoleData.splice(rowIndex, 1);
            siteInvestigationData.boreHoleData = boreHoleData;
            setData({
                ...data,
                siteInvestigationData: siteInvestigationData,
            });
        }
    };

    const addLayer = () => {
        const siteInvestigationData = data.siteInvestigationData;
        const boreHoleData = data.siteInvestigationData.boreHoleData;
        boreHoleData.push({
            boreHoleNumber: undefined,
            boreHoleDepth: undefined,
        });
        siteInvestigationData.boreHoleData = boreHoleData;
        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };

    const handleChange = (e: any, rowIndex: number) => {
        const id = e.target.id;
        const value = e.target.value;

        const siteInvestigationData = data.siteInvestigationData;
        const coordinate = {
            ...siteInvestigationData.boreHoleData[rowIndex],
            [id]: value,
        };
        siteInvestigationData.boreHoleData[rowIndex] = coordinate;

        setData({
            ...data,
            siteInvestigationData: siteInvestigationData,
        });
    };
    const columnTitles = ['Sondaj No', 'Sondaj Derinliği(m)'];
    const columnIDs = ['boreHoleNumber', 'boreHoleDepth'];

    return (
        <div className="mt-3">
            <hr className="mb-3" />
            <TableCreator
                columnTitles={columnTitles}
                columnIDs={columnIDs}
                dataSource={data.siteInvestigationData.boreHoleData}
                form={form}
                handleChange={handleChange}
                handleRemove={removeRow}
                tableID="boreHoleTable"
            />
            <AddRowButton onClick={addLayer} />
        </div>
    );
};
