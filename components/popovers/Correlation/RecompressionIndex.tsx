import { useState } from 'react';
import { Correlation } from './elements';
import calcRecompressionIndex from '@/lib/apps/soil_correlations/recompression_index';

export function RecompressionIndex(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        compressionIndex: true,
    });
    const [data, setData] = useState({
        compressionIndex: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'compressionIndex',
            label: 'Sıkışma İndisi',
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
                calcRecompressionIndex(inputData, props.soilClass)
            }
            abbreviation="C<sub>R</sub>"
            outputUnit=""
            showOutput={props.showOutput}
        />
    );
}
