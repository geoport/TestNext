import importProto from 'lib/import_proto';
import { InputData as eqSelectionData } from 'types/earthquake_selection/input_types';
import { InputData as graData } from 'types/ground_response_analysis/input_types';
import { InputData as seismicAnalysisData } from 'types/seismic_analysis/input_types';
import path from 'path';

type RequestParam = {
    eqSelectionRequest: eqSelectionData;
    graRequest: graData;
    seismicAnalysisRequest: seismicAnalysisData;
    appName: string;
    userId: string;
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
        client.ApiHandler(requestParam, (error: any, response: any) => {
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

    return res.status(200).json({ message: JSON.stringify(output) });
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
