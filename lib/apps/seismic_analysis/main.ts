import { InputData } from 'types/seismic_analysis/input_types';
import { insertData } from '@/lib/supabase';
import { captureException } from '@sentry/nextjs';
import { getRedisData } from '@/lib/helper';

export default async function seismicAnalysisHandler(
    data: InputData,
    userId: string,
) {
    const requestParam = {
        seismicAnalysisRequest: data,
        appName: 'SeismicAnalysis',
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
            },
        });
        throw new Error('Failed to analyze');
    }
    const outputJson = await response.json();
    const cacheKey = JSON.parse(outputJson.message).cacheKey;
    const output = await getRedisData(cacheKey, 120);

    await insertData(
        {
            app_name: 'seismic_analysis',
            user_id: userId,
            region: 'tr',
        },
        'app_usage',
    );

    return output;
}
