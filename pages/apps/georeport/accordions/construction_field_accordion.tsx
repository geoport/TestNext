import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import { useEffect, useState, useContext } from 'react';
import ConstructionFieldForm from 'forms/georeport/construction_field_form';
import { AddRowButton } from 'components/elements/Buttton';
import * as tbl from 'components/elements/Table';
import DataContext from '../context';
import { FormField } from 'models/FormField';
import { InputData, ConstructionFieldData } from 'types/georeport/input_types';

export default function ConstructionFieldAccordion({
    cityList,
}: {
    cityList: string[];
}) {
    const { analysisOptions, data, setData } = useContext(DataContext);
    const [counties, setCounties] = useState(['']);
    const [neighbourhoods, setNeighbourhoods] = useState(['']);

    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const constructionFieldData = {
            ...data.constructionFieldData,
            [name_]: value || '',
        };
        setData({
            ...data,
            constructionFieldData: constructionFieldData,
        });
    };

    const handleListChange = (id: string, e: any) => {
        const constructionFieldData = {
            ...data.constructionFieldData,
            [id]: e.value,
        };
        setData({
            ...data,
            constructionFieldData: constructionFieldData,
        });
    };

    useEffect(() => {
        (async () => {
            const response = await getCounties(
                data.constructionFieldData.city || cityList[0],
            );
            const counties_ = JSON.parse(response.message);
            setCounties(counties_);
            handleListChange('county', { value: counties_[0] });
        })();
    }, [data.constructionFieldData.city]);

    useEffect(() => {
        (async () => {
            const city = data.constructionFieldData.city || cityList[0];
            const county =
                data.constructionFieldData.county || counties[0] || 'Aladağ';
            const response = await getNeighbourhoods(city, county);
            const neighbourhoods_ = JSON.parse(response.message);
            setNeighbourhoods(neighbourhoods_);
        })();
    }, [data.constructionFieldData.city, data.constructionFieldData.county]);

    const form = new ConstructionFieldForm(cityList, counties, neighbourhoods);

    return (
        <Accordion
            id="constructionFieldData"
            title="Saha Bilgileri"
            hidden={!analysisOptions.constructionFieldPage}
        >
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.city}
                    selected={data.constructionFieldData.city || 'Adana'}
                    setSelected={(e) => handleListChange('city', e)}
                />
                <fields.ListBox
                    formField={form.county}
                    selected={data.constructionFieldData.county || counties[0]}
                    setSelected={(e) => handleListChange('county', e)}
                />
                <fields.ListBox
                    formField={form.neighbourhood}
                    selected={
                        data.constructionFieldData.neighbourhood ||
                        neighbourhoods[0]
                    }
                    setSelected={(e) => handleListChange('neighbourhood', e)}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['pafta']}
                    formField={form.pafta}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['ada']}
                    formField={form.ada}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['parsel']}
                    formField={form.parsel}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['parcelArea']}
                    formField={form.parcelArea}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['landSlope']}
                    formField={form.landSlope}
                />
            </div>
            <ParcelTable
                handleInputChange={handleInputChange}
                data={data}
                form={form}
            />
            <CoordinateTable data={data} setData={setData} form={form} />
        </Accordion>
    );
}

async function getCounties(city: string) {
    const response = await fetch('/api/get_counties', {
        method: 'POST',
        body: JSON.stringify({ city }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

async function getNeighbourhoods(city: string, county: string) {
    const response = await fetch('/api/get_neighbourhoods', {
        method: 'POST',
        body: JSON.stringify({ city, county }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

type TableCellProps = {
    formField: FormField;
    handleChange: (e: any) => void;
    data: InputData;
};
const TableCell = ({ formField, handleChange, data }: TableCellProps) => {
    return (
        <td className="border border-slate-600">
            <fields.InputField
                formField={formField}
                onChange={handleChange}
                value={
                    data.constructionFieldData[
                        formField.id as keyof ConstructionFieldData
                    ] as string
                }
            />
        </td>
    );
};

type ParcelTableProps = {
    form: ConstructionFieldForm;
    data: InputData;
    handleInputChange: (e: any) => void;
};
const ParcelTable = ({ handleInputChange, data, form }: ParcelTableProps) => {
    return (
        <div className="mt-3">
            <hr className="mb-3" />
            <tbl.Table>
                <tbl.TableHead>
                    <tr>
                        <tbl.Th>Cephe</tbl.Th>
                        <tbl.Th>Parsel Bilgisi</tbl.Th>
                        <tbl.Th>Yapılaşma Bilgisi</tbl.Th>
                    </tr>
                </tbl.TableHead>
                <tbody>
                    <tr>
                        <tbl.Td>Kuzey Cephesi</tbl.Td>
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.northParcelInfo}
                        />
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.northStructuralInfo}
                        />
                    </tr>
                    <tr>
                        <tbl.Td>Güney Cephesi</tbl.Td>
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.southParcelInfo}
                        />
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.southStructuralInfo}
                        />
                    </tr>
                    <tr>
                        <tbl.Td>Doğu Cephesi</tbl.Td>
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.eastParcelInfo}
                        />
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.eastStructuralInfo}
                        />
                    </tr>
                    <tr>
                        <tbl.Td>Batı Cephesi</tbl.Td>
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.westParcelInfo}
                        />
                        <TableCell
                            handleChange={handleInputChange}
                            data={data}
                            formField={form.westStructuralInfo}
                        />
                    </tr>
                </tbody>
            </tbl.Table>
        </div>
    );
};

type CoordinateTableProps = {
    data: InputData;
    setData: Function;
    form: ConstructionFieldForm;
};
const CoordinateTable = ({ data, setData, form }: CoordinateTableProps) => {
    const removeRow = (rowIndex: number) => {
        const constructionFieldData = data.constructionFieldData;
        const fieldCoordinates = constructionFieldData.fieldCoordinates;
        if (fieldCoordinates.length > 1) {
            fieldCoordinates.splice(rowIndex, 1);
            constructionFieldData.fieldCoordinates = fieldCoordinates;
            setData({
                ...data,
                constructionFieldData: constructionFieldData,
            });
        }
    };

    const addLayer = () => {
        const constructionFieldData = data.constructionFieldData;
        const fieldCoordinates = data.constructionFieldData.fieldCoordinates;
        fieldCoordinates.push({ latitude: '', longitude: '' });
        constructionFieldData.fieldCoordinates = fieldCoordinates;
        setData({
            ...data,
            constructionFieldData: constructionFieldData,
        });
    };

    const handleChange = (e: any, rowIndex: number) => {
        const id = e.target.id;
        const value = e.target.value;

        const constructionFieldData = data.constructionFieldData;
        const coordinate = {
            ...constructionFieldData.fieldCoordinates[rowIndex],
            [id]: value,
        };
        constructionFieldData.fieldCoordinates[rowIndex] = coordinate;

        setData({
            ...data,
            constructionFieldData: constructionFieldData,
        });
    };

    const columnTitles = ['Enlem', 'Boylam'];
    const columnIDs = ['latitude', 'longitude'];

    return (
        <div className="mt-3">
            <hr className="mb-3" />
            <h6 className="mb-4 text-center lg:text-2xl">
                Arazi Dış Sınır Koordinatları
            </h6>
            <tbl.TableCreator
                columnTitles={columnTitles}
                columnIDs={columnIDs}
                dataSource={data.constructionFieldData.fieldCoordinates}
                form={form}
                handleChange={handleChange}
                handleRemove={removeRow}
                tableID="coordinateTable"
            />
            <AddRowButton onClick={addLayer} />
        </div>
    );
};
