import connectRedis from '@/lib/redis';

export default async function handler(req: any, res: any) {
    const client = await connectRedis();
    const body = req.body;
    const data = await client.get(`data:${body.index}`);

    return res.status(200).json({ message: data });
}
