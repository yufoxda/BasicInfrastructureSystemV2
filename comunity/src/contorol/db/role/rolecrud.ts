import { SupabaseClient } from "@supabase/supabase-js";

// 本来はこう以下
// export function createRole(client: SupabaseClient, id: string) {
//     return client.from('users').select('*').eq('id', id).single();
// }

// export function getRoleByIds(client: SupabaseClient, ids: string[]) {
//     return client.from('users').select('*').in('id', ids);
// }


// export function updateRole(client: SupabaseClient, id: string, updates: Partial<{ email: string, name: string }>) {
//     return client.from('users').update(updates).eq('id', id).single();
// }

// export function deleteRole(client: SupabaseClient, id: string) {
//     return client.from('users').delete().eq('id', id).single();
// }

// 以下は仮
export function createRole() {
    console.log('dbコントローラ')
    return 
}

export function getRoleByIds(){
    return
}
    

export function updateRole() {
    return
}

export function deleteRole() {
    return
}
