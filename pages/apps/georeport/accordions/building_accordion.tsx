import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import { BuildingForm } from 'forms/building_form';
import { useContext } from 'react';
import DataContext from '../context';
import { FormField } from 'models/FormField';
import { InputData } from 'types/georeport/input_types';
import { BuildingData } from 'types/building';

type ListFieldProps = {
    formField: FormField;
    data: InputData;
    handleListChange: (id: string, e: any) => void;
};
const ListField = (props: ListFieldProps) => {
    const { formField, data, handleListChange } = props;
    return (
        <fields.ListBox
            formField={formField}
            selected={data.buildingData[formField.id as keyof BuildingData]}
            setSelected={(e) => handleListChange(formField.id, e)}
        />
    );
};

export default function BuildingAccordion() {
    const { analysisOptions, data, setData } = useContext(DataContext);
    const form = new BuildingForm();
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const buildingData = { ...data.buildingData, [name_]: value || '' };
        setData({
            ...data,
            buildingData: buildingData,
        });
    };

    const handleListChange = (id: string, e: any) => {
        const buildingData = { ...data.buildingData, [id]: e.value };
        setData({
            ...data,
            buildingData: buildingData,
        });
    };

    return (
        <Accordion
            id="buildingData"
            title="Yapı Bilgileri"
            hidden={!analysisOptions.structuralInformationPage}
        >
            <div className="grid grid-cols-2 gap-2">
                <fields.InputField
                    formField={form.structuralSystem}
                    onChange={handleInputChange}
                    value={data.buildingData['structuralSystem']}
                />
                <fields.InputField
                    formField={form.buildingType}
                    onChange={handleInputChange}
                    value={data.buildingData['buildingType']}
                />
                <fields.InputField
                    formField={form.constructionArea}
                    onChange={handleInputChange}
                    value={data.buildingData['constructionArea']}
                />
                <fields.InputField
                    formField={form.foundationArea}
                    onChange={handleInputChange}
                    value={data.buildingData['foundationArea']}
                />
                <fields.InputField
                    formField={form.basementFloorNumber}
                    onChange={handleInputChange}
                    value={data.buildingData['basementFloorNumber']}
                />
                <fields.InputField
                    formField={form.totalFloorNumber}
                    onChange={handleInputChange}
                    value={data.buildingData['totalFloorNumber']}
                />
                <ListField
                    data={data}
                    handleListChange={handleListChange}
                    formField={form.buildingUsageClass}
                />
                <ListField
                    data={data}
                    handleListChange={handleListChange}
                    formField={form.buildingHeightClass}
                />
                <ListField
                    data={data}
                    handleListChange={handleListChange}
                    formField={form.buildingImportanceFactor}
                />
                <fields.InputField
                    formField={form.buildingHeight}
                    onChange={handleInputChange}
                    value={data.buildingData['buildingHeight']}
                />
            </div>
        </Accordion>
    );
}
