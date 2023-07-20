import { createClient } from '@supabase/supabase-js';
import process from 'process';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const client = createClient(supabaseUrl, supabaseKey);

export default client;
