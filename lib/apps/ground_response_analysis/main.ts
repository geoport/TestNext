import * as inputTypes from 'types/ground_response_analysis/input_types';
import * as apiTypes from 'types/ground_response_analysis/api_types';
import { insertData } from '@/lib/supabase';
import { captureException } from '@sentry/nextjs';
import { getRedisData } from '@/lib/helper';
import getReportUrl from '@/lib/apps/get_report_url';
import { SoilData, SoilProfile } from 'types/soil_profile';

export default async function graHandler(
    data: inputTypes.InputData,
    templateName: string,
    userId: string,
): Promise<apiTypes.OutputData> {
    const requestData = createRequestData(data);
    const requestParam = {
        graRequest: requestData,
        appName: 'GRA',
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
                data,
                templateName,
            },
        });
        throw new Error('Failed to analyze');
    }

    const outputJson = await response.json();
    const cacheKey = JSON.parse(outputJson.message).cacheKey;

    const output = await getRedisData(cacheKey, 180);

    if (Object.keys(output.outputMotions).length === 0) {
        throw new Error('Failed to analyze');
    }

    let reportUrl = '';

    if (data.giveReport) {
        const context = { ...data, ...output };
        reportUrl = await getReportUrl(
            JSON.stringify(context),
            templateName,
            userId,
            'ground_response_analysis',
        );
    }

    output.reportUrl = reportUrl;

    await insertData(
        {
            app_name: 'ground_response_analysis',
            user_id: userId,
            region: 'tr',
        },
        'app_usage',
    );

    return output;
}

const transformSoilProfile = (soilProfile: SoilData): SoilProfile => {
    const profile: SoilProfile = {
        shearWaveVelocity: [],
        thickness: [],
        unitWeight: [],
        dampingRatio: [],
        plasticityIndex: [],
    };
    for (const layer of soilProfile.layers) {
        profile.shearWaveVelocity?.push(layer.shearWaveVelocity as number);
        profile.thickness?.push(layer.thickness as number);
        profile.unitWeight?.push(layer.unitWeight as number);
        profile.dampingRatio?.push(layer.dampingRatio as number);
        profile.plasticityIndex?.push(layer.plasticityIndex as number);
    }

    return profile;
};

const transformMotions = (
    records: inputTypes.Record[],
): {
    [key: string]: apiTypes.InputMotion;
} => {
    const motions: {
        [key: string]: apiTypes.InputMotion;
    } = {};

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        motions[`Record${i + 1}`] = {
            timeStep: record.timeStep as number,
            accelerations: record.accelerations,
        };
    }

    return motions;
};

const createRequestData = (
    data: inputTypes.InputData,
): apiTypes.RequestData => {
    const profile = transformSoilProfile(data.soilProfile);
    let boundaryCondition;
    if (data.soilProfile.baseRockType === 'Rijit') {
        boundaryCondition = 'rigid';
    } else {
        boundaryCondition = 'elastic';
    }
    if (boundaryCondition !== 'rigid' && boundaryCondition !== 'elastic') {
        throw new Error(
            `Invalid boundaryCondition value: ${boundaryCondition}`,
        );
    }
    const requestData: apiTypes.RequestData = {
        soilProfile: profile,
        boundaryCondition: boundaryCondition,
        inputMotions: transformMotions(data.recordData),
    };

    return requestData;
};
