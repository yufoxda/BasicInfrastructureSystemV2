import { z } from '@hono/zod-openapi'

export const roleSchema = z.object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    display_name: z.string().openapi({ example: 'admin' }),
    created_at: z.string().openapi({ example: '2024-01-01T12:00:00Z' }),
    updated_at: z.string().openapi({ example: '2024-01-02T12:00:00Z' }),
})

export const updateRoleSchema = z.object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    display_name: z.string().openapi({ example: 'admin' }).nullable()
})