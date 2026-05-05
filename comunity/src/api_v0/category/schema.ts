import { z } from '@hono/zod-openapi'

export const categorySchema = z.object({
    id: z.string().openapi({ example: 'cat-123' }),
    name: z.string().openapi({ example: 'General' }),
    display_order: z.number().openapi({ example: 1 }),
    created_at: z.string().openapi({ example: '2024-01-01T12:00:00Z' }),
    updated_at: z.string().openapi({ example: '2024-01-02T12:00:00Z' }),
}).openapi('Category')

export const createCategorySchema = z.object({
    name: z.string().openapi({ example: 'General' }),
    display_order: z.number().optional().openapi({ example: 1 }),
}).openapi('CreateCategoryRequest')

export const updateCategorySchema = z.object({
    name: z.string().optional().openapi({ example: 'New Name' }),
    display_order: z.number().optional().openapi({ example: 2 }),
}).openapi('UpdateCategoryRequest')
