import type { Context } from "hono"
import { AppContext } from "../../core/types"

/**
 * Role Service
 * ロール定義のマスターデータを管理するビジネスロジックを提供します。
 */

const mockRole = { 
    role_id: "r-123", 
    role_name: "admin" 
};

// --- Create ---

export const createRoleService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    return c.json({ ...mockRole, ...body }, 201);
};

// --- Read ---

export const listRolesService = async (c: Context<AppContext>) => {
    return c.json([mockRole], 200);
};

export const getRoleByIdService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    return c.json({ ...mockRole }, 200);
};

// --- Update ---

export const updateRoleService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    return c.json({ ...mockRole, ...body, role_id: id }, 200);
};

// --- Delete ---

export const deleteRoleService = async (c: Context<AppContext>) => {
    return c.body(null, 204);
};
