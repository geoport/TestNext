const protoLoader = require('@grpc/proto-loader');
import path from 'path';

export default function importProto(fileName: string) {
    const options = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };
    const protoPath = path.join(
        process.cwd(),
        'public',
        'proto',
        `${fileName}.proto`,
    );
    const pkgDefs = protoLoader.loadSync(protoPath, options);
    return pkgDefs;
}
