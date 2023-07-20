import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import foundationImage from 'public/assets/imgs/foundation.png';
import Image from 'next/image';
import FoundationForm from 'forms/jet_grout/foundation_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function FoundationAccordion() {
    const { data, setData } = useContext(DataContext);
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const foundationData = { ...data.foundationData, [name_]: value || '' };
        setData({
            ...data,
            foundationData: foundationData,
        });
    };
    const analysisOptions = data.analysisOptions;
    const isHidden = !(
        analysisOptions.enhanceBearingCapacity ||
        analysisOptions.enhanceSettlement
    );
    const form = new FoundationForm(analysisOptions);
    return (
        <Accordion
            title="Temel Bilgileri"
            id="foundationData"
            hidden={isHidden}
        >
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <fields.InputField
                        formField={form.foundationWidth}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationWidth}
                    />
                    <fields.InputField
                        formField={form.foundationLength}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationLength}
                    />
                    <fields.InputField
                        formField={form.foundationDepth}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationDepth}
                    />
                    <fields.InputField
                        formField={form.foundationBaseAngle}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationBaseAngle}
                        hide={!analysisOptions.enhanceBearingCapacity}
                    />
                    <fields.InputField
                        formField={form.slopeAngle}
                        onChange={handleInputChange}
                        value={data.foundationData.slopeAngle}
                        hide={!analysisOptions.enhanceBearingCapacity}
                    />
                    <fields.InputField
                        formField={form.foundationArea}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationArea}
                    />
                </div>
                <Image src={foundationImage} alt="Temel Tipi" />
            </div>
        </Accordion>
    );
}
