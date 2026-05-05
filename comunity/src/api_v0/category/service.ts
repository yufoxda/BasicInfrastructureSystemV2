import type { Context } from "hono"
import { AppContext } from "../../core/types"
import { HTTPException } from "hono/http-exception"

const mockCategory = {
    category_id: "cat-123",
    category_name: "General",
};

export const createCategoryService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    const body = await c.req.json();
    return c.json({ ...mockCategory, ...body }, 201);
};

export const listCategoriesService = async (c: Context<AppContext>) => {
    return c.json([mockCategory], 200);
};

export const getCategoryByIdService = async (c: Context<AppContext>) => {
    const id = c.req.param("id");
    return c.json({ ...mockCategory, category_id: id }, 200);
};

export const updateCategoryService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    const id = c.req.param("id");
    const body = await c.req.json();
    return c.json({ ...mockCategory, ...body, category_id: id }, 200);
};

export const deleteCategoryService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    return c.body(null, 204);
};