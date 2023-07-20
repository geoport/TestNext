import { useState } from 'react';
import calcUndrainedShearStrength from '@/lib/apps/soil_correlations/undrained_shear_strength';
import { Correlation } from './elements';

export function UndrainedShearStrength(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        shearWaveVelocity: true,
    });

    const [data, setData] = useState({
        shearWaveVelocity: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            label: 'Kayma Dalgası Hızı',
            id: 'shearWaveVelocity',
            unit: 'm/s',
        },
    ];

    return (
        <Correlation
            inputData={data}
            setData={setData}
            setSelectedFields={setSelectedFields}
            inputFields={fields}
            onSubmit={props.onSubmit}
            selectedFields={selectedFields}
            calcOutput={(inputData: any) =>
                calcUndrainedShearStrength(inputData, props.soilClass)
            }
            abbreviation="c<sub>u</sub>"
            outputUnit="t/m<sup>2</sup>"
            showOutput={props.showOutput}
        />
    );
}
