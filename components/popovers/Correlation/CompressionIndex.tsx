import { useState } from 'react';
import { Correlation } from './elements';
import calcCompressionIndex from '@/lib/apps/soil_correlations/compression_index';

export function CompressionIndex(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        liquidLimit: true,
        voidRatio: true,
        waterContent: true,
    });
    const [data, setData] = useState({
        liquidLimit: '',
        voidRatio: '',
        waterContent: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'liquidLimit',
            label: 'Likit Limit',
            unit: '%',
        },
        {
            id: 'voidRatio',
            label: 'Boşluk Oranı',
        },
        {
            id: 'waterContent',
            label: 'Su Muhtevası',
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
                calcCompressionIndex(inputData, props.soilClass)
            }
            showOutput={props.showOutput}
            abbreviation="C<sub>c</sub>"
            outputUnit=""
        />
    );
}
