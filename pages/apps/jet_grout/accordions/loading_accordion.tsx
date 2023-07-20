import { InputField } from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import LoadingForm from 'forms/jet_grout/loading_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function LoadingAccordion() {
    const { data, setData } = useContext(DataContext);
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const loadingData = { ...data.loadingData, [name_]: value || '' };
        setData({
            ...data,
            loadingData: loadingData,
        });
    };
    const analysisOptions = data.analysisOptions;

    const isHidden = !(
        analysisOptions.enhanceBearingCapacity ||
        analysisOptions.enhanceSettlement
    );

    const form = new LoadingForm(analysisOptions);

    return (
        <Accordion title="Yük Bilgileri" hidden={isHidden} id="loadingData">
            <div className="grid grid-cols-2 gap-2">
                <InputField
                    formField={form.horizontalLoadX}
                    onChange={handleInputChange}
                    value={data.loadingData.horizontalLoadX}
                    hide={!analysisOptions.enhanceBearingCapacity}
                />
                <InputField
                    formField={form.horizontalLoadY}
                    onChange={handleInputChange}
                    value={data.loadingData.horizontalLoadY}
                    hide={!analysisOptions.enhanceBearingCapacity}
                />
                <InputField
                    formField={form.foundationPressure}
                    onChange={handleInputChange}
                    value={data.loadingData.foundationPressure}
                />
            </div>
        </Accordion>
    );
}
