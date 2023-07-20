import { MongoClient } from 'mongodb';
import process from 'process';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
const dbName = `tr`;

export async function connectToDatabase() {
    const client = await MongoClient.connect(uri);

    return client;
}

export async function insertData(collection: string, data: any): Promise<any> {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const result = await db.collection(collection).insertOne(data);
    client.close();
    return result;
}

export async function fetchData(collection: string): Promise<any> {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const result = await db.collection(collection).find().toArray();
    client.close();
    return result;
}

export async function saveProject(
    collection: string,
    data: any,
): Promise<void> {
    const client = await connectToDatabase();
    const db = client.db(dbName);

    await db.collection(collection).updateOne(
        {
            projectName: data.projectName,
            appName: data.appName,
        },
        { $set: data },
        { upsert: true },
    );
    client.close();
}
