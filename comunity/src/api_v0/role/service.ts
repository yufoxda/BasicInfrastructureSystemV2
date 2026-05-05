import type { Context } from 'hono'
import { AppContext } from '../../core/types'

const mockRole = {
    id: 'role-123',
    display_name: 'admin',
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z',
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

export const getRoleByRolrIdService =async (c: Context<AppContext> ) => {
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