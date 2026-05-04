import type { SupabaseClient } from "@supabase/supabase-js";


export function getUserById(client: SupabaseClient, id: string) {
    return client.from('users').select('*').eq('id', id).single();
}

export function getUsersByIds(client: SupabaseClient, ids: string[]) {
    return client.from('users').select('*').in('id', ids);
}

export function createUser(client: SupabaseClient, email: string, name: string) {
    return client.from('users').insert({ email, name }).single();
}

export function updateUser(client: SupabaseClient, id: string, updates: Partial<{ email: string, name: string }>) {
    return client.from('users').update(updates).eq('id', id).single();
}

export function deleteUser(client: SupabaseClient, id: string) {
    return client.from('users').delete().eq('id', id).single();
}
