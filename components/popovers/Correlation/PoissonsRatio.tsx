import { useState } from 'react';
import { Correlation } from './elements';
import calcPoissonsRatio from '@/lib/apps/soil_correlations/poissons_ratio';

export function PoissonsRatio(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        frictionAngle: true,
        voidRatio: true,
        shearModulus: true,
        effectiveStress: true,
    });
    const [data, setData] = useState({
        frictionAngle: '',
        voidRatio: '',
        shearModulus: '',
        effectiveStress: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'frictionAngle',
            label: 'İçsel Sürtünme Açısı',
        },
        {
            id: 'voidRatio',
            label: 'Boşluk Oranı',
        },
        {
            id: 'shearModulus',
            label: 'Kayma Modülü',
            unit: 'kPa',
        },
        {
            id: 'effectiveStress',
            label: 'Efektif gerilme',
            unit: 'kPa',
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
                calcPoissonsRatio(inputData, props.soilClass)
            }
            abbreviation="&mu;"
            outputUnit=""
            showOutput={props.showOutput}
        />
    );
}
