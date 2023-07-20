import { useState } from 'react';
import { Correlation } from './elements';
import calcFrictionAngle from '@/lib/apps/soil_correlations/friction_angle';

export function FrictionAngle(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        N60: true,
        N160: true,
        relativeDensity: true,
        effectiveStress: true,
        plasticityIndex: true,
    });
    const [data, setData] = useState({
        N60: '',
        N160: '',
        relativeDensity: '',
        effectiveStress: '',
        plasticityIndex: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'N60',
            label: 'N<sub>60</sub>',
        },
        {
            id: 'N160',
            label: 'N<sub>1,60</sub>',
        },
        {
            id: 'relativeDensity',
            label: 'Bağıl Yoğunluk',
            unit: '%',
        },
        {
            id: 'effectiveStress',
            label: 'Efektif gerilme',
            unit: 'kPa',
        },
        {
            id: 'plasticityIndex',
            label: 'Plastisite indisi',
            unit: '%',
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
                calcFrictionAngle(inputData, props.soilClass)
            }
            abbreviation="&Phi;"
            outputUnit=""
            showOutput={props.showOutput}
        />
    );
}
