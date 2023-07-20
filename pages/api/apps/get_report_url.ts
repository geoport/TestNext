import importProto from 'lib/import_proto';
import path from 'path';

type RequestParam = {
    appName: string;
    userId: string;
    serializedContext: any;
    templateName: string;
};
async function sendRequest(requestParam: RequestParam): Promise<any> {
    const grpc = require('@grpc/grpc-js');
    const fs = require('fs');
    const pkgDefs = importProto('middleware');
    const apiProto = grpc.loadPackageDefinition(pkgDefs).ApiMiddleWare;

    const getPath = (fileName: string) => {
        return path.join(
            process.cwd(),
            'public',
            'certs',
            'middle',
            `${fileName}`,
        );
    };

    const client = new apiProto.ApiMiddleWare(
        'middle.soilprime.com:8080',
        grpc.credentials.createSsl(
            fs.readFileSync(getPath('middle.crt')),
            fs.readFileSync(getPath('middle.key')),
            fs.readFileSync(getPath('middle-ca.crt')),
        ),
    );

    return new Promise((resolve, reject) => {
        client.ReportHandler(requestParam, (error: any, response: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

export default async function handler(req: any, res: any) {
    const { data } = req.body;
    let output: any;

    try {
        output = await sendRequest(data);
    } catch (error) {
        try {
            output = await sendRequest(data);
        } catch (error) {
            return res.status(503).json({ message: error });
        }
    }

    if (output.error) {
        return res.status(501).json({ message: output.error });
    }

    const reportUrl = output.reportUrl;

    return res.status(200).json({ message: reportUrl });
}

export const config = {
    api: {
        responseLimit: false,
        externalResolver: true,
        bodyParser: {
            sizeLimit: '120mb',
        },
    },
};
