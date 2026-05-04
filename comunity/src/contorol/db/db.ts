// ここでDBクライアントを初期化して、APIハンドラーで利用できるようにした方がいい
import type { SupabaseClient } from "@supabase/supabase-js"

export function createRole(client: SupabaseClient, id: string){
    return client.from('roles').select('*')
}

export function readRole(client: SupabaseClient, id: string){
    return client.from('roles').select('*')
}

export function updateRole(client: SupabaseClient, id: string){
    return client.from('roles').select('*')
}

export function deleteRole(client: SupabaseClient, id: string){
    return client.from('roles').select('*')
}
