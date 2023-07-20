import { getRedisData } from '@/lib/helper';
import { OutputData } from 'types/earthquake_selection/api_types';
import { InputData } from 'types/earthquake_selection/input_types';
import { insertData } from '@/lib/supabase';
import { captureException } from '@sentry/nextjs';

export default async function earthquakeSelectionHandler(
    data: InputData,
    userId: any,
): Promise<OutputData> {
    const requestParam = {
        eqSelectionRequest: data,
        appName: 'EqSelection',
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
        captureException('', {
            extra: {
                userId,
                data,
                file: 'src/lib/apps/earthquake_selection/main.ts',
                content: outputJson,
            },
        });
        throw new Error('Failed to analyze');
    }
    const outputJson = await response.json();
    const cacheKey = JSON.parse(outputJson.message).cacheKey;

    const output = await getRedisData(cacheKey, 120);

    if (output.targetSpectra.length === 0) {
        throw new Error('Failed to analyze');
    }
    await insertData(
        {
            app_name: 'earthquake_selection',
            user_id: userId,
            region: 'tr',
        },
        'app_usage',
    );
    return output;
}
