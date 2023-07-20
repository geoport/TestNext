import { InputField } from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import ConstructionFieldForm from 'forms/ground_response_analysis/construction_field_form';
import DataContext from '../context';
import React, { useContext } from 'react';

export default function ConstructionFieldAccordion() {
    const { data, handleInputChange } = useContext(DataContext);
    const form = new ConstructionFieldForm();

    return (
        <Accordion
            id="constructionFieldData"
            title="Saha Bilgileri"
            hidden={!data.giveReport}
        >
            <div className="grid grid-cols-2 gap-2">
                <InputField
                    onChange={handleInputChange}
                    value={data.city}
                    formField={form.city}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.county}
                    formField={form.county}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.neighbourhood}
                    formField={form.neighbourhood}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.pafta}
                    formField={form.pafta}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.ada}
                    formField={form.ada}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.parsel}
                    formField={form.parsel}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.boreholeDepth as number}
                    formField={form.boreholeDepth}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.boreholeNumber as number}
                    formField={form.boreholeNumber}
                />
                <InputField
                    onChange={handleInputChange}
                    value={data.VS30 as number}
                    formField={form.VS30}
                />
            </div>
        </Accordion>
    );
}
