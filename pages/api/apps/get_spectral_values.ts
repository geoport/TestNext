import https from 'https';
import path from 'path';

export default async function handler(req: any, res: any) {
    const { latitude, longitude } = req.body;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const output: Record<string, any> = {};
    const getUrl = (dyhd: string) =>
        `https://python.soilprime.com:8086/seismic_hazard?dyhd_no=${dyhd}&latitude=${latitude}&longitude=${longitude}`;

    const fs = require('fs');
    const fetch = require('node-fetch');

    const certPath = path.join(
        process.cwd(),
        'public',
        'certs',
        'python',
        'python.crt',
    );
    const certificate = fs.readFileSync(certPath);

    const agent = new https.Agent({
        cert: certificate,
        rejectUnauthorized: false,
    });

    try {
        for (let i = 1; i <= 4; i++) {
            const url = getUrl(i.toString());
            const response = await fetch(url, { agent });
            const json = await response.json();
            output[`SS_DD${i}`] = json.SS.toFixed(5);
            output[`S1_DD${i}`] = json.S1.toFixed(5);
            output[`PGA_DD${i}`] = json.PGA.toFixed(5);
        }
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({ message: JSON.stringify(output) });
}

export const config = {
    api: {
        responseLimit: false,
        externalResolver: true,
    },
};
