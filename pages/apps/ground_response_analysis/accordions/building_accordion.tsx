import { InputField } from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import BuildingForm from 'forms/ground_response_analysis/building_form';
import FoundationForm from 'forms/ground_response_analysis/foundation_form';
import DataContext from '../context';
import React, { useContext } from 'react';

export default function BuildingAccordion() {
    const { data, handleInputChange } = useContext(DataContext);
    const buildingForm = new BuildingForm(data.giveReport);
    const foundationForm = new FoundationForm(data.giveReport);

    return (
        <Accordion
            id="buildingData"
            title="Yapı Bilgileri"
            hidden={!data.giveReport}
        >
            <div className="grid grid-cols-2 gap-2">
                <InputField
                    formField={buildingForm.structuralSystem}
                    onChange={handleInputChange}
                    value={data.structuralSystem}
                />
                <InputField
                    formField={buildingForm.buildingType}
                    onChange={handleInputChange}
                    value={data.buildingType}
                />
                <InputField
                    formField={foundationForm.foundationArea}
                    onChange={handleInputChange}
                    value={data.foundationArea as number}
                />
                <InputField
                    formField={foundationForm.foundationWidth}
                    onChange={handleInputChange}
                    value={data.foundationWidth as number}
                />
                <InputField
                    formField={foundationForm.foundationDepth}
                    onChange={handleInputChange}
                    value={data.foundationDepth as number}
                />
                <InputField
                    formField={foundationForm.foundationLength}
                    onChange={handleInputChange}
                    value={data.foundationLength as number}
                />
            </div>
        </Accordion>
    );
}
