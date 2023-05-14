import { createClient } from '@supabase/supabase-js'

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
console.log(import.meta.env.VITE_SUPABASE_URL)
const supabase = createClient(supabaseURL, supabaseKey)

export default supabase
