import ProjectAccordion from '../accordions/project_accordion';
import BuildingAccordion from '../accordions/building_accordion';
import RecordAccordion from '../accordions/record_accordion';
import ConstructionFieldAccordion from '../accordions/construction_field_accordion';
import SoilProfileAccordion from '../accordions/soil_profile_accordion';
import { BooleanField } from 'components/elements/FormFields';
import React, { useContext } from 'react';
import DataContext from '../context';
import TemplateList from 'components/elements/TemplateList';

export default function InputTab(props: {
    templates: any[];
    selectedTemplate: string;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<any>>;
}) {
    const { data, handleInputChange } = useContext(DataContext);
    return (
        <>
            <div className="ml-4 mb-2">
                <BooleanField
                    formField={{
                        id: 'giveReport',
                        label: 'Analiz sonucunda rapor oluştur',
                    }}
                    checked={data.giveReport}
                    setChecked={(e) => handleInputChange(e, 'boolean')}
                />
            </div>
            {data.giveReport && (
                <TemplateList
                    templates={props.templates}
                    selectedTemplate={props.selectedTemplate}
                    setSelectedTemplate={props.setSelectedTemplate}
                />
            )}

            <ProjectAccordion />
            <ConstructionFieldAccordion />
            <BuildingAccordion />
            <RecordAccordion />
            <SoilProfileAccordion />
        </>
    );
}
