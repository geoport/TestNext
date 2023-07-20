import { useState } from 'react';
import { Correlation } from './elements';
import calcShearModulus from '@/lib/apps/soil_correlations/shear_modulus';

export function ShearModulus(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        N60: true,
        N160: true,
    });
    const [data, setData] = useState({
        N60: '',
        N160: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'N160',
            label: 'N<sub>1,60</sub>',
        },
        {
            id: 'N60',
            label: 'N<sub>60</sub>',
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
                calcShearModulus(inputData, props.soilClass)
            }
            abbreviation="G"
            outputUnit="t/m<sup>2</sup>"
            showOutput={props.showOutput}
        />
    );
}
