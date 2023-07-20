import { FormField } from 'models/FormField';

export const getSelected = (field: FormField, value: string) => {
    return field.choices?.find((item) => item.value === value).key;
};

export function readFile(file: File): Promise<number[]> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const text = reader.result as string;
            const rows = text.split('\n');
            const accelerations = rows.map((row) =>
                parseFloat(row.split('\r')[0]),
            );
            resolve(accelerations);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsText(file);
    });
}

export const string2Date = (date: string): Date => {
    let year, month, day;
    if (date.includes('-')) {
        [year, month, day] = date.split('-');
    } else if (date.includes('/')) {
        [year, month, day] = date.split('/');
    } else {
        [year, month, day] = date.split('.');
    }
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export async function getRedisData(cacheKey: string, timeOut: number) {
    await waitCacheStatus(cacheKey, timeOut);

    const chunks: Buffer[] = [];
    for (let i = 0; i < 100; i++) {
        const key = `${cacheKey}_${i}`;
        const data = await getCache(key);

        if (data === null) {
            break;
        } else {
            chunks.push(Buffer.from(data));
        }
    }

    let jsonObj;
    try {
        jsonObj = convertToJson(chunks);
    } catch (error) {
        return null;
    }
    return jsonObj;
}

async function getCache(cacheKey: string) {
    const response = await fetch('/api/get_cache', {
        method: 'POST',
        body: JSON.stringify(cacheKey),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.message;
}

function convertToJson(chunks: Buffer[]) {
    const buffer = Buffer.concat(chunks);

    const jsonObj = JSON.parse(buffer.toString());

    return jsonObj;
}

async function waitCacheStatus(
    cacheKey: string,
    timeOut: number,
): Promise<void> {
    return new Promise((resolve) => {
        const intervalId = setInterval(async () => {
            const cacheStatus = await getCache(cacheKey);
            if (cacheStatus === 'done') {
                clearInterval(intervalId);
                resolve(); // Resolve the Promise once the interval is cleared
            }
        }, timeOut * 10);
        setTimeout(() => {
            clearInterval(intervalId);
            resolve(); // Resolve the Promise even if the interval is not cleared
        }, timeOut * 1000);
    });
}
