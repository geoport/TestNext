import React from 'react';
import SavedProjectsList from 'components/elements/SavedProjectsList';
import { BooleanField } from 'components/elements/FormFields';
import AnalysisOptionsForm from 'forms/jet_grout/analysis_options_form';
import { InputData } from 'types/jet_grout/input_types';
import TemplateList from 'components/elements/TemplateList';

export default function AnalysisTab(props: {
    data: InputData;
    setData: React.Dispatch<React.SetStateAction<InputData>>;
    setOutput: React.Dispatch<React.SetStateAction<any>>;
    savedProjects: any[];
    selectedProject: any;
    setSelectedProject: React.Dispatch<React.SetStateAction<any>>;
    setShowReportTab: React.Dispatch<React.SetStateAction<boolean>>;
    templates: any[];
    selectedTemplate: string;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<any>>;
    onLoadProject: () => void;
}) {
    const { data, setData } = props;

    const handleChange = (e: any) => {
        const { id, checked } = e.target;
        let analysisOptions = data.analysisOptions;
        analysisOptions = { ...analysisOptions, [id]: checked };
        setData({
            ...data,
            analysisOptions,
        });
    };

    const form = new AnalysisOptionsForm();
    return (
        <div>
            <SavedProjectsList
                projects={props.savedProjects}
                selectedProject={props.selectedProject}
                setSelectedProject={props.setSelectedProject}
                onLoadProject={props.onLoadProject}
            />
            <TemplateList
                templates={props.templates}
                selectedTemplate={props.selectedTemplate}
                setSelectedTemplate={props.setSelectedTemplate}
            />
            <hr className="mt-3" />
            <BooleanField
                formField={form.enhanceBearingCapacity}
                checked={data.analysisOptions.enhanceBearingCapacity}
                setChecked={handleChange}
            />
            <BooleanField
                formField={form.enhanceSettlement}
                checked={data.analysisOptions.enhanceSettlement}
                setChecked={handleChange}
            />
            <BooleanField
                formField={form.enhanceSoilParams}
                checked={data.analysisOptions.enhanceSoilParams}
                setChecked={handleChange}
            />
        </div>
    );
}
