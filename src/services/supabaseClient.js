import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pcvpunqrlneudelwfcth.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdnB1bnFybG5ldWRlbHdmY3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjg0NzQsImV4cCI6MjA5NjYwNDQ3NH0.FoKEulO5GYF_2wSKs_59b0FXt0EYqS3CXvHeR3bwCe8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);