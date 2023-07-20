import { InputData, AnalysisOptions } from 'types/georeport/input_types';
import * as types from 'types/georeport/api_types';
import convertInputData from './data_converter';
import { insertData } from '@/lib/supabase';
import { captureException } from '@sentry/nextjs';
import getReportUrl from '@/lib/apps/get_report_url';
import { getRedisData } from '@/lib/helper';

export default async function georeportHandler(
    inputData: InputData,
    analysisOptions: AnalysisOptions,
    userId: any,
    templateName: string,
): Promise<types.GoPrimeResponse> {
    const requestData = convertInputData(inputData, analysisOptions);
    const requestParam = {
        goPrimeRequest: requestData,
        appName: 'georeport',
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
                analysisOptions,
            },
        });
        throw new Error('Failed to analyze');
    }

    const outputJson = await response.json();
    const cacheKey = JSON.parse(outputJson.message).cacheKey;
    const output: types.GoPrimeResponse = await getRedisData(cacheKey, 30);

    const errorMessage = checkOutput(requestData.analysisOptions, output);

    if (errorMessage) {
        captureException(new Error(outputJson.message), {
            extra: {
                userId,
                inputData,
                templateName,
                analysisOptions,
            },
        });
        throw new Error(errorMessage);
    }

    const context = { inputData, ...output, analysisOptions };
    let reportUrl = '';
    try {
        reportUrl = await getReportUrl(
            JSON.stringify(context),
            templateName,
            userId,
            'georeport',
        );
    } catch (error) {
        console.log(error);
    }

    output.reportUrl = reportUrl;
    await insertData(
        {
            app_name: 'georeport',
            user_id: userId,
            region: 'tr',
        },
        'app_usage',
    );

    return output;
}

function checkOutput(
    analysisOptions: types.AnalysisOptions,
    output: types.GoPrimeResponse,
) {
    if (analysisOptions.liquefactionAnalysis && output.liquefaction === null) {
        return 'Liquefaction analysis failed';
    }
    if (analysisOptions.settlementAnalysis && output.settlement === null) {
        return 'Settlement analysis failed';
    }
    if (
        analysisOptions.localSoilClassAnalysis &&
        output.localSoilClass === null
    ) {
        return 'Local soil class analysis failed';
    }
    if (
        analysisOptions.horizontalSlidingAnalysis &&
        output.horizontalSliding === null
    ) {
        return 'Horizontal sliding analysis failed';
    }
    if (
        analysisOptions.bearingCapacityAnalysis &&
        output.bearingCapacity === null
    ) {
        return 'Bearing capacity analysis failed';
    }
    if (
        analysisOptions.effectiveDepthAnalysis &&
        output.effectiveDepth === null
    ) {
        return 'Effective depth analysis failed';
    }
    if (
        analysisOptions.swellingPotentialAnalysis &&
        output.swellingPotential === null
    ) {
        return 'Swelling potential analysis failed';
    }
    if (
        analysisOptions.soilCoefficientAnalysis &&
        output.soilCoefficient === null
    ) {
        return 'Soil coefficient analysis failed';
    }

    return false;
}
