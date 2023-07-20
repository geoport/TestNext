import connectRedis from '@/lib/redis';

export default async function handler(req: any, res: any) {
    const client = await connectRedis();
    const cacheKey = req.body;

    const data = await client.get(cacheKey);

    try {
        await client.del(cacheKey);
    } catch (error) {
        console.log(error);
    }
    client.quit();

    return res.status(200).json({ message: data });
}
