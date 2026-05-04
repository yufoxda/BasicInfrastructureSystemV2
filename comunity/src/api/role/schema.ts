import { z } from '@hono/zod-openapi'

export const RoleSchema = z.object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    name: z.string().openapi({ example: 'admin' }),
    description: z.string().openapi({ example: 'Administrator role with full permissions' }),
    created_at: z.string().openapi({ example: '2024-01-01T12:00:00Z' }),
    updated_at: z.string().openapi({ example: '2024-01-02T12:00:00Z' }),
}).openapi('Role')

export const UpdateRoleSchema = z.object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    name: z.string().openapi({ example: 'admin' }).nullable(),
    description: z.string().openapi({ example: 'Administrator role with full permissions' }).nullable(),
    updated_at: z.string().openapi({ example: '2024-01-02T12:00:00Z' }).nullable(),
}).openapi('UpdateRoleRequest')