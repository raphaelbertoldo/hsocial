import { createClient } from '@supabase/supabase-js';
import { config as dotenv } from 'dotenv';

dotenv();

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
