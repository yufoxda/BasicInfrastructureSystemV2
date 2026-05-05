import type { Context } from "hono"
import { AppContext } from "../../core/types"
import { HTTPException } from "hono/http-exception"

/**
 * User Service
 * モックデータを使用してユーザー関連のビジネスロジックを提供します。
 */

const mockUser = { 
    discord_user_id: "u-123", 
    display_name: "John Doe", 
    auth_user_id: "a-123", 
    discord_id: "d-123", 
    member_id: "m-123" 
};

const mockRole = { 
    role_id: "r-123", 
    role_name: "admin" 
};

// --- Create ---

export const createUserService = async (c: Context<AppContext>) => {
    return c.json(mockUser, 201);
};

// --- Read ---

export const listUsersService = async (c: Context<AppContext>) => {
    return c.json([mockUser], 200);
};

export const getUserMeService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    return c.json({ ...mockUser, discord_user_id: user.id }, 200);
};

export const getUserByIdService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    return c.json({ ...mockUser}, 200);
};

export const getUserRolesService = async (c: Context<AppContext>) => {
    return c.json([mockRole], 200);
};

// --- Update ---

export const updateUserMeService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body, discord_user_id: user.id }, 200);
};

export const updateUserByIdService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body, discord_user_id: id }, 200);
};

export const updateUserRolesService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") throw new HTTPException(403);
    const body = await c.req.json();
    return c.json([mockRole], 200);
};

// --- Delete ---

export const deleteUserByIdService = async (c: Context<AppContext>) => {
    return c.body(null, 204);
};
