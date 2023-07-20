import React from 'react';
import { ListBox } from './FormFields';
import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import { getSelected } from 'lib/helper';

/**
 * A component that shows a list of saved report templates and
 * allows the user to select one of them.
 * @param templates - A list of saved report templates
 * @param selectedTemplate - The currently selected report template
 * @param setSelectedTemplate - A function that sets the selected report template
 * @returns TemplateList component
 */
export default function TemplateList(props: {
    templates: string[];
    selectedTemplate: string;
    setSelectedTemplate: (project: string) => void;
}) {
    const { templates, selectedTemplate, setSelectedTemplate } = props;
    const field = new FormField({
        id: 'report_templates',
        label: '',
        choices: createMapList(templates),
    });
    return (
        <div className="ml-4">
            <label>Rapor Şablonu</label>
            <div className="grid w-1/3 grid-cols-2 gap-2">
                <ListBox
                    formField={field}
                    selected={getSelected(field, selectedTemplate)}
                    setSelected={(e) => setSelectedTemplate(e.value)}
                />
            </div>
        </div>
    );
}
