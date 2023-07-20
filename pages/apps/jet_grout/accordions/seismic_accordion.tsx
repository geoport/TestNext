import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import SeismicForm from 'forms/jet_grout/seismic_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function SeismicAccordion() {
    const { data, setData } = useContext(DataContext);
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const seismicData = { ...data.seismicData, [name_]: value || '' };
        setData({
            ...data,
            seismicData: seismicData,
        });
    };

    const handleListChange = (e: any, id: string) => {
        const seismicData = { ...data.seismicData, [id]: e.value };
        setData({
            ...data,
            seismicData: seismicData,
        });
    };

    const form = new SeismicForm();
    return (
        <Accordion title="Deprem Parametreleri" id="seismicData">
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.localSoilClass}
                    selected={data.seismicData.localSoilClass}
                    setSelected={(e) => handleListChange(e, 'localSoilClass')}
                />
                <fields.InputField
                    formField={form.earthquakeMagnitude}
                    onChange={handleInputChange}
                    value={data.seismicData.earthquakeMagnitude}
                />
                <fields.InputField
                    formField={form.SS}
                    onChange={handleInputChange}
                    value={data.seismicData.SS}
                />
                <fields.InputField
                    formField={form.S1}
                    onChange={handleInputChange}
                    value={data.seismicData.S1}
                />
            </div>
        </Accordion>
    );
}
