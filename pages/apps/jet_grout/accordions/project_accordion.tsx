import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import ProjectForm from 'forms/project_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function ProjectAccordion() {
    const { data, setData } = useContext(DataContext);
    const form = new ProjectForm();
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const projectData = { ...data.projectData, [name_]: value || '' };
        setData({
            ...data,
            projectData: projectData,
        });
    };

    const handleDateChange = (date: Date) => {
        setData({
            ...data,
            projectData: { ...data.projectData, reportDate: date },
        });
    };

    return (
        <Accordion title="Proje Bilgileri" id="projectData">
            <div className="grid grid-cols-2 gap-2">
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.projectData.owner}
                    formField={form.owner}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.projectData.geotechnicalEngineer}
                    formField={form.geotechnicalEngineer}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.projectData.reporter}
                    formField={form.reporter}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.projectData.reportFooter}
                    formField={form.reportFooter}
                />
                <fields.DateTimeField
                    formField={form.reportDate}
                    onChange={handleDateChange}
                    value={data.projectData.reportDate as Date}
                />
            </div>
        </Accordion>
    );
}
