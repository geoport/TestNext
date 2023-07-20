import { InputData } from './types';
import { captureException } from '@sentry/nextjs';

export default async function gmpPredictionHandler(inputData: InputData) {
    const requestData = {
        Mw: inputData.Mw,
        VS30: inputData.VS30,
        Rrup: inputData.Rrup,
        fault_type: inputData.faultType,
        data_type: inputData.outputType,
        period: inputData.period || 0,
    };

    const response = await fetch('https://api.soilprime.com/predict', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
    if (response.status !== 200) {
        const outputJson = await response.json();
        captureException(new Error(outputJson.message), {
            extra: {
                inputData,
            },
        });
        throw new Error('Failed to analyze');
    }
    const outputJson = await response.json();

    return outputJson;
}
