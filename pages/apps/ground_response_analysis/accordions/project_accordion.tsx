import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import ProjectForm from 'forms/ground_response_analysis/project_form';
import DataContext from '../context';
import React, { useContext } from 'react';

export default function ProjectAccordion() {
    const { data, handleInputChange } = useContext(DataContext);
    const form = new ProjectForm();

    return (
        <Accordion
            title="Proje Bilgileri"
            id="projectData"
            hidden={!data.giveReport}
        >
            <div className="grid grid-cols-2 gap-2">
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.owner}
                    formField={form.owner}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.contractor}
                    formField={form.contractor}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.staticProjectOwner}
                    formField={form.staticProjectOwner}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.architect}
                    formField={form.architect}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.geologyEngineer}
                    formField={form.geologyEngineer}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.geophysicEngineer}
                    formField={form.geophysicEngineer}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.reporter}
                    formField={form.reporter}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.reportFooter}
                    formField={form.reportFooter}
                />

                <fields.DateTimeField
                    formField={form.reportDate}
                    onChange={(date) =>
                        handleInputChange({
                            target: { name: 'reportDate', value: date },
                        })
                    }
                    value={data.reportDate as Date}
                />
            </div>
        </Accordion>
    );
}
