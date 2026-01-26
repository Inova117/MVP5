// MOCK SUPABASE CLIENT FOR DEMO MODE
// This prevents errors when missing environment variables
// and allows the app to run in a standalone demo mode.

const mockSupabase = {
    auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    },
    from: (_table: string) => ({
        select: () => ({
            eq: () => ({
                single: async () => ({ data: null, error: null }),
                maybeSingle: async () => ({ data: null, error: null }),
                order: async () => ({ data: [], error: null }),
            }),
            order: () => ({
                limit: async () => ({ data: [], error: null })
            }),
            single: async () => ({ data: null, error: null }),
        }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
        upsert: async () => ({ data: null, error: null }),
    }),
    storage: {
        from: () => ({
            upload: async () => ({ data: null, error: null }),
            getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
    },
}

// In a real app we would use createClient
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabase = mockSupabase as any
