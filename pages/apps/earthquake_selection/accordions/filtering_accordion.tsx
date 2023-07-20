import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import { useState, useEffect, useContext } from 'react';
import FilteringForm from 'forms/earthquake_selection/filtering_form';
import DataContext from '../context';

export default function FilteringAccordion() {
    const { data, setData, handleInputChange } = useContext(DataContext);
    const filteringForm = new FilteringForm();
    const [selectedFaults, setSelectedFaults] = useState(
        filteringForm.faultTypes.choices,
    );

    useEffect(() => {
        const faults = selectedFaults?.map((fault) => fault.value);
        setData({ ...data, faultTypes: faults });
    }, [selectedFaults]);

    return (
        <Accordion id="filteringData" title="Ön Filtreleme Parametreleri">
            <div className="grid grid-cols-2 gap-2">
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['minMw']}
                    formField={filteringForm.minMw}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['maxMw']}
                    formField={filteringForm.maxMw}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['minPga']}
                    formField={filteringForm.minPga}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['maxPga']}
                    formField={filteringForm.maxPga}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['minAI']}
                    formField={filteringForm.minAI}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['maxAI']}
                    formField={filteringForm.maxAI}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['minRrup']}
                    formField={filteringForm.minRrup}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['maxRrup']}
                    formField={filteringForm.maxRrup}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['minVS30']}
                    formField={filteringForm.minVS30}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['maxVS30']}
                    formField={filteringForm.maxVS30}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['minYear']}
                    formField={filteringForm.minYear}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data['maxYear']}
                    formField={filteringForm.maxYear}
                />
                <fields.ListBox
                    formField={filteringForm.faultTypes}
                    selected={selectedFaults}
                    setSelected={setSelectedFaults}
                    multiple={true}
                />
            </div>
        </Accordion>
    );
}
