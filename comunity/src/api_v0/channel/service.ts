import type { Context } from "hono"
import { AppContext } from "../../core/types"
import { HTTPException } from "hono/http-exception"

/**
 * Channel Service
 * チャンネル管理および権限割り当てのビジネスロジックを提供します。
 */

const mockChannel = { 
    channel_id: "ch-123", 
    channel_name: "General", 
    category_id: "cat-123" 
};

const mockRole = { 
    role_id: "r-123", 
    role_name: "admin" 
};

// --- Create ---

export const createChannelService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    return c.json({ ...mockChannel, ...body }, 201);
};

// --- Read ---

export const getChannelService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    return c.json({ ...mockChannel, channel_id: id }, 200);
};

export const getChannelRolesService = async (c: Context<AppContext>) => {
    return c.json([mockRole], 200);
};

// --- Update ---

export const updateChannelService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    return c.json({ ...mockChannel, ...body, channel_id: id }, 200);
};

export const updateChannelRolesService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") throw new HTTPException(403);
    const body = await c.req.json();
    return c.json([mockRole], 200);
};

// --- Delete ---

export const deleteChannelService = async (c: Context<AppContext>) => {
    return c.body(null, 204);
};
