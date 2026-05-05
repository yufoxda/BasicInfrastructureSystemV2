import type { Context } from "hono"
import { AppContext } from "../../core/types"
import { HTTPException } from "hono/http-exception"

/**
 * Category Service
 * カテゴリ管理および権限割り当てのビジネスロジックを提供します。
 */

const mockCategory = { 
    category_id: "cat-123", 
    category_name: "General" 
};

const mockRole = { 
    role_id: "r-123", 
    role_name: "admin" 
};

// --- Create ---

export const createCategoryService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    return c.json({ ...mockCategory, ...body }, 201);
};

// --- Read ---

export const listCategoriesService = async (c: Context<AppContext>) => {
    return c.json([mockCategory], 200);
};

export const getCategoryByIdService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    return c.json({ ...mockCategory}, 200);
};

export const getCategoryRolesService = async (c: Context<AppContext>) => {
    return c.json([mockRole], 200);
};

// --- Update ---

export const updateCategoryService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    return c.json({ ...mockCategory, ...body, category_id: id }, 200);
};

export const updateCategoryRolesService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") throw new HTTPException(403);
    const body = await c.req.json();
    return c.json([mockRole], 200);
};

// --- Delete ---

export const deleteCategoryService = async (c: Context<AppContext>) => {
    return c.body(null, 204);
};
