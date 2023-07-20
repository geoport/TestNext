import { useState } from 'react';
import { Correlation } from './elements';
import calcElasticModulus from '@/lib/apps/soil_correlations/elastic_modulus';

export function ElasticModulus(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        unconfinedCompressiveStrength: true,
        N60: true,
        coneResistance: true,
        //shearModulus: true,
    });
    const [data, setData] = useState({
        unconfinedCompressiveStrength: '',
        N60: '',
        coneResistance: '',
        //shearModulus: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'unconfinedCompressiveStrength',
            label: 'Serbest Basınç Dayanımı',
            unit: 'kPa',
        },
        {
            id: 'N60',
            label: 'N<sub>60</sub>',
        },
        {
            id: 'coneResistance',
            label: 'Koni Uç Direnci',
            unit: 'kPa',
        },
        //{
        //    id: 'shearModulus',
        //    label: 'Kayma Modülü',
        //    unit: 'kPa',
        //},
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
                calcElasticModulus(inputData, props.soilClass)
            }
            showOutput={props.showOutput}
            abbreviation="E<sub>s</sub>"
            outputUnit="t/m<sup>2</sup>"
        />
    );
}
