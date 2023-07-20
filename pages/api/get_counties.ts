import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';

function onlyUnique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
}

export default async function handler(req: any, res: any) {
    const { city } = req.body;
    const filePath = path.join(
        process.cwd(),
        'data',
        'location_data',
        city + '.json',
    );
    const jsonData = await fs.readFile(filePath);
    const objectData = JSON.parse(jsonData.toString());
    const counties = objectData
        .map((item: any) => item.ilce)
        .filter(onlyUnique);
    return res.status(200).json({ message: JSON.stringify(counties) });
}
