import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserById
    , createUser
    , getUsersByIds
    , updateUser
    , deleteUser
 } from "../contorol/db/user/usercrud";

export const getUserService = async ( supabase: SupabaseClient ) => {
    const { data, error } = await getUserById(supabase, 'some-user-id');
    if (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
    }
    return data;
};  

export const createUserService = async ( supabase: SupabaseClient, userData: any ) => {
    const { data, error } = await createUser(supabase, userData.email, userData.name);
    if (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
    return data;
}

export const getUsersByIdsService = async ( supabase: SupabaseClient, ids: string[] ) => {
    const { data, error } = await getUsersByIds(supabase, ids);
    if (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
    return data;
}

export const updateUserService = async ( supabase: SupabaseClient, id: string, updates: any ) => {
    const { data, error } = await updateUser(supabase, id, updates);
    if (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
    return data;
}

export const deleteUserService = async ( supabase: SupabaseClient, id: string ) => {
    const { data, error } = await deleteUser(supabase, id);
    if (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
    return data;
}

