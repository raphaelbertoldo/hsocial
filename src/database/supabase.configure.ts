// supabase.config.ts

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(`>>>`, process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// const SUPABASE_URL = 'https://sua-instancia.supabase.co';
// const SUPABASE_KEY = 'sua-chave-de-api';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
