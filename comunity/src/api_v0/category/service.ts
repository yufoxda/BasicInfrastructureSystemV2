import type { Context } from 'hono'
import { AppContext } from '../../core/types'
import { HTTPException } from 'hono/http-exception'

const mockCategory = {
    id: 'cat-123',
    name: 'General',
    display_order: 1,
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z',
};

export const createCategoryService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const body = await c.req.json();
    return c.json({ ...mockCategory, ...body }, 201);
};

export const listCategoriesService = async (c: Context<AppContext>) => {
    return c.json([mockCategory], 200);
};

export const getCategoryByIdService = async (c: Context<AppContext>) => {
    const id = c.req.param('id');
    return c.json(mockCategory, 200);
};

export const updateCategoryService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    const body = await c.req.json();
    return c.json({ ...mockCategory, ...body, id }, 200);
};

export const deleteCategoryService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    return c.body(null, 204);
};
