import { InputData, AnalysisOptions } from 'types/jet_grout/input_types';
import * as types from 'types/jet_grout/api_types';
import convertInputData from './data_converter';
import { insertData } from '@/lib/supabase';
import { captureException } from '@sentry/nextjs';
import getReportUrl from '@/lib/apps/get_report_url';
import { getRedisData } from '@/lib/helper';

export default async function jetGroutHandler(
    inputData: InputData,
    userId: any,
    templateName: string,
    appName: string,
): Promise<types.OutputData> {
    const requestData = convertInputData(inputData);
    const requestParam = {
        goPrimeRequest: requestData,
        appName,
        userId: userId,
    };
    const response = await fetch('/api/apps/api_handler', {
        method: 'POST',
        body: JSON.stringify({ data: requestParam }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        const outputJson = await response.json();
        captureException(new Error(outputJson.message), {
            extra: {
                userId,
                inputData,
                templateName,
            },
        });
        throw new Error('Failed to analyze');
    }

    const outputJson = await response.json();
    const cacheKey = JSON.parse(outputJson.message).cacheKey;
    const output: types.OutputData = await getRedisData(cacheKey, 60);

    const errorMessage = checkOutput(requestData.analysisOptions, output);

    if (errorMessage) {
        captureException(new Error(outputJson.message), {
            extra: {
                userId,
                inputData,
                templateName,
            },
        });
        throw new Error(errorMessage);
    }

    const context = { inputData, ...output };
    const reportUrl = await getReportUrl(
        context,
        templateName,
        userId,
        appName,
    );

    output.reportUrl = reportUrl;
    await insertData(
        {
            app_name: appName,
            user_id: userId,
            region: 'tr',
        },
        'app_usage',
    );

    return output;
}

function checkOutput(
    analysisOptions: AnalysisOptions,
    output: types.OutputData,
) {
    if (
        analysisOptions.enhanceBearingCapacity &&
        output.enhancedBearingCapacity === null
    ) {
        return 'Bearing capacity analysis failed';
    }
    if (
        analysisOptions.enhanceSettlement &&
        output.enhancedSettlement === null
    ) {
        return 'Settlement analysis failed';
    }
    if (analysisOptions.enhanceSoilParams) {
        if (output.enhancedFrictionAngle === null) {
            return 'Friction angle enhancement failed';
        }
        if (output.enhancedElasticModulus === null) {
            return 'Elastic modulus enhancement failed';
        }
        if (output.enhancedCohesion === null) {
            return 'Cohesion enhancement failed';
        }
    }

    return false;
}
