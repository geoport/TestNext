const fs = require('fs');

export default async function handler(req: any, res: any) {
    const { data } = req.body;

    try {
        const js = JSON.stringify(data);
        fs.writeFileSync('output.json', js);
    } catch (error) {
        console.error(error);
    }

    return res.status(200).json();
}

export const config = {
    api: {
        responseLimit: false,
        externalResolver: true,
        bodyParser: {
            sizeLimit: '40mb', // Set desired value here
        },
    },
};
