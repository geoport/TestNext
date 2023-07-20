import React from 'react';
import { ListBox } from './FormFields';
import { BorderButton } from './Buttton';
import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import { getSelected } from 'lib/helper';

/**
 * A component that shows a list of saved projects and
 * allows the user to select one of them.
 * @param projests - A list of saved projects
 * @param selectedProject - The currently selected project
 * @param setSelectedProject - A function that sets the selected project
 * @returns SavedProjectsList component
 */
export default function SavedProjectsList(props: {
    projects: string[];
    selectedProject: string;
    setSelectedProject: (project: string) => void;
    onLoadProject: () => void;
}) {
    let { projects } = props;
    const { selectedProject, setSelectedProject, onLoadProject } = props;
    const noData = projects.length == 0;
    projects = noData ? ['Kayıtlı proje bulunamadı'] : projects;
    const field = new FormField({
        id: 'saved_projects',
        label: '',
        choices: createMapList(projects),
    });
    return (
        <div className="ml-4">
            <label>Kayıtlı Projeler</label>
            <div className="grid w-1/3 grid-cols-2 gap-2">
                <ListBox
                    formField={field}
                    selected={getSelected(
                        field,
                        selectedProject || projects[0],
                    )}
                    setSelected={(e) => setSelectedProject(e.value)}
                />
                <div>
                    <BorderButton disabled={noData} onClick={onLoadProject}>
                        Projeyi Yükle
                    </BorderButton>
                </div>
            </div>
        </div>
    );
}
