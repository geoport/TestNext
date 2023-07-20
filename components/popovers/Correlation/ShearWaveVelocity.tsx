import { useState } from 'react';
import { Correlation } from './elements';
import calcShearWaveVelocity from '@/lib/apps/soil_correlations/shear_wave_velocity';

export function ShearWaveVelocity(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        N60: true,
        undrainedShearStrength: true,
        N160: true,
    });
    const [data, setData] = useState({
        N60: '',
        undrainedShearStrength: '',
        N160: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'N60',
            label: 'N<sub>60</sub>',
        },
        {
            id: 'undrainedShearStrength',
            label: 'Drenajsız Kayma Dayanımı',
            unit: 'kPa',
        },
        {
            id: 'N160',
            label: 'N<sub>1,60</sub>',
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
                calcShearWaveVelocity(inputData, props.soilClass)
            }
            abbreviation="V<sub>S</sub>"
            outputUnit="m/s"
            showOutput={props.showOutput}
        />
    );
}
