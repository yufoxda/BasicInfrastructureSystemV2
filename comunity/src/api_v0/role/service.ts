import type { Context } from 'hono'
import { AppContext } from '../../core/types'

const mockRole = {
    role_id: "123e4567-e89b-12d3-a456-426614174000" ,
    role_name: "admin",
}

export const createRoleService = async (c: Context<AppContext> ) => {
    return c.json(mockRole, 201);
}

export const getRolesService = async (c: Context<AppContext> ) => {
    return c.json([mockRole], 200);
}

export const getRolesByUserIdService = async (c: Context<AppContext> ) => {
    return c.json([mockRole], 200);
}

export const getRoleByRoleIdService =async (c: Context<AppContext> ) => {
    return c.json(mockRole, 200);
}

export const updateRolesService = async (c: Context<AppContext> ) => {
    return c.json([mockRole], 200);
}

export const updateRoleService = async (c: Context<AppContext> ) => {
    return c.json(mockRole, 200);
}

export const deleteRoleService =async (c: Context<AppContext> ) => {
    return c.json(null, 200);
}