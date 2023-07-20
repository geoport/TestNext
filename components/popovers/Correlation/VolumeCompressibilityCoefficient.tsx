import { useState } from 'react';
import { Correlation } from './elements';
import calcVolumeCompressibilityCoefficient from '@/lib/apps/soil_correlations/volume_compressibility_coefficient';

export function VolumeCompressibilityCoefficient(props: {
    onSubmit?: (output: any) => void;
    soilClass: string;
    showOutput?: boolean;
}) {
    const [selectedFields, setSelectedFields] = useState({
        compressionIndex: true,
        voidRatio: true,
        N60: true,
        plasticityIndex: true,
    });
    const [data, setData] = useState({
        compressionIndex: '',
        voidRatio: '',
        N60: '',
        plasticityIndex: '',
        selectedValue: 'minimum',
    });

    const fields = [
        {
            id: 'compressionIndex',
            label: 'Sıkışma İndisi',
        },
        {
            id: 'voidRatio',
            label: 'Boşluk Oranı',
        },
        {
            id: 'N60',
            label: 'N<sub>60</sub>',
        },
        {
            id: 'plasticityIndex',
            label: 'Plastisite İndisi',
            unit: '%',
        },
    ];

    //const extraValidation = (inputData: any) => {
        //if (!inputData.compressionIndex && !inputData.voidRatio) {
            //return 'Sıkışma İndisi veya Boşluk Oranı parametrelerinden en az biri girilmelidir.';
        //}
        //if (!inputData.N60) {
            //return 'N<sub>60</sub> değeri zorunludur.';
        //}
        //return '';
    //};

    return (
        <Correlation
            inputData={data}
            setData={setData}
            setSelectedFields={setSelectedFields}
            inputFields={fields}
            onSubmit={props.onSubmit}
            selectedFields={selectedFields}
            calcOutput={(inputData: any) =>
                calcVolumeCompressibilityCoefficient(inputData, props.soilClass)
            }
            //extraValidation={extraValidation}
            abbreviation="m<sub>v</sub>"
            outputUnit="m<sup>2</sup>/t"
            showOutput={props.showOutput}
        />
    );
}
