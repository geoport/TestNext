import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import foundationImage from 'public/assets/imgs/foundation.png';
import Image from 'next/image';
import FoundationForm from 'forms/georeport/foundation_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function FoundationAccordion() {
    const { analysisOptions, data, setData } = useContext(DataContext);
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

    const isHidden = !(
        analysisOptions.structuralInformationPage ||
        analysisOptions.bearingCapacityAnalysis ||
        analysisOptions.settlementAnalysis ||
        analysisOptions.effectiveDepthAnalysis ||
        analysisOptions.swellingPotentialAnalysis ||
        analysisOptions.soilCoefficientAnalysis
    );

    const handleSurfaceChange = (e: any) => {
        const foundationData = {
            ...data.foundationData,
            foundationSurfaceType: e.value,
        };
        setData({
            ...data,
            foundationData: foundationData,
        });
    };

    const form = new FoundationForm({});
    return (
        <Accordion
            title="Temel Bilgileri"
            hidden={isHidden}
            id="foundationData"
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
                        formField={form.foundationArea}
                        onChange={handleInputChange}
                        value={data.buildingData.foundationArea}
                    />
                    <fields.InputField
                        formField={form.foundationBaseAngle}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationBaseAngle}
                    />
                    <fields.InputField
                        formField={form.slopeAngle}
                        onChange={handleInputChange}
                        value={data.foundationData.slopeAngle}
                    />
                    <fields.InputField
                        formField={form.foundationType}
                        onChange={handleInputChange}
                        value={data.foundationData.foundationType}
                    />
                    <fields.ListBox
                        formField={form.foundationSurfaceType}
                        selected={data.foundationData.foundationSurfaceType}
                        setSelected={handleSurfaceChange}
                    />
                </div>
                <Image src={foundationImage} alt="Temel Tipi" />
            </div>
        </Accordion>
    );
}
