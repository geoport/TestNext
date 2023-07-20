import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';

export default async function handler(req: any, res: any) {
    const { city, county } = req.body;
    const filePath = path.join(
        process.cwd(),
        'data',
        'location_data',
        city + '.json',
    );
    const jsonData = await fs.readFile(filePath);
    const objectData = JSON.parse(jsonData.toString());
    const neighbourhoods: string[] = [];
    objectData.forEach((item: any) => {
        if (item.ilce === county) {
            neighbourhoods.push(item.neighbourhood);
        }
    });

    return res.status(200).json({ message: JSON.stringify(neighbourhoods) });
}
