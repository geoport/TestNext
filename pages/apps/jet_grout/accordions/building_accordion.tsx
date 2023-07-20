import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import { BuildingForm } from 'forms/building_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function BuildingAccordion() {
    const { data, setData } = useContext(DataContext);
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

    return (
        <Accordion id="buildingData" title="Yapı Bilgileri">
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
                    formField={form.totalFloorNumber}
                    onChange={handleInputChange}
                    value={data.buildingData['totalFloorNumber']}
                />
            </div>
        </Accordion>
    );
}
