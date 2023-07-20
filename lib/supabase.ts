import { createClient } from '@supabase/supabase-js';
import process from 'process';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const client = createClient(supabaseUrl, supabaseKey);

export async function insertData(data: any, tableName: string) {
    const { data: insertedData, error } = await client
        .from(tableName)
        .insert(data)
        .select('id');

    if (error) {
        return console.error(error);
    } else {
        return insertedData[0].id;
    }
}

export async function fetchDataByUser(userId: string, tableName: string) {
    const { data, error } = await client
        .from(tableName)
        .select('*')
        .eq('user_id', userId);

    if (error) {
        return console.error(error);
    } else {
        return data;
    }
}

export async function deleteItem(itemId: string, tableName: string) {
    const { error } = await client.from(tableName).delete().eq('id', itemId);

    if (error) {
        return console.error(error);
    }
}

export default client;
