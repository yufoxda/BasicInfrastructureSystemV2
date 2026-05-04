import type { Context } from 'hono'
import { AppContext } from '../../types'
import { 
    createRole,
    getRoleByIds,
    updateRole,
    deleteRole
} from '../../operate/role'

// ***** 公開api *****

const mockRole = {
    id: 'role-123',
    name: 'admin',
    description: 'Administrator role with full permissions',
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z'
};

export const createRoleService = async (c: Context<AppContext>) => {
    
    console.log('公開API createRole')
    createRole();
    return c.json(mockRole, 201);
};

export const getRolesService = async (c: Context<AppContext>) => {
    getRoleByIds();
    return c.json([mockRole], 200);
};

export const getRolesByIdService = async (c: Context<AppContext>) => {

    getRoleByIds();
    return c.json([mockRole], 200);
};

export const updateRoleService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    updateRole();
    return c.json([mockRole], 200);
};

export const updateRoleByIdService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    updateRole();
    return c.json([mockRole], 200);
};

export const deleteRoleService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    deleteRole();
    return c.json([mockRole], 200);
};

export const deleteRoleByRoleIdService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    deleteRole();
    return c.json([mockRole], 200);
};

