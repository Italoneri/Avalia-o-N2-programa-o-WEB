import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pcvpunqrlneudelwfcth.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdnB1bnFybG5ldWRlbHdmY3RoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTAyODQ3NCwiZXhwIjoyMDk2NjA0NDc0fQ.ujRDrWxpFLrtdZfqSkeqR3Nu6eGqM4AP0W3cRy9-Iz0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);