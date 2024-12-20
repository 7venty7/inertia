import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

import { SUPABASE_URL, SUPABASE_API_KEY } from "@env"

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})
