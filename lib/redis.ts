import { createClient } from 'redis';

export default async function connectRedis() {
    const url = 'redis://3.75.190.32:6379';
    const client = createClient({
        url,
    });
    await client.connect();
    return client;
}
