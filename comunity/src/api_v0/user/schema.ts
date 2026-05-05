import { z } from '@hono/zod-openapi'

export const UserSchema = z.object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    name: z.string().openapi({ example: 'johndoe' }),
    display_name: z.string().openapi({ example: 'John Doe' }),
    grade: z.string().openapi({ example: 'A' }),
    emergency_contact: z.string().openapi({ example: 'Jane Doe - 555-1234' }),
    student_id: z.string().openapi({ example: 'S12345678' }),
    student_email: z.string().email().openapi({ example: 'john.doe@student.example.com' }),
    insurance: z.boolean().openapi({ example: true }),
    some_allergy: z.boolean().openapi({ example: false }),
    created_at: z.string().openapi({ example: '2024-01-01T12:00:00Z' }),
    updated_at: z.string().openapi({ example: '2024-01-02T12:00:00Z' }),
    discord_id: z.string().openapi({ example: '123456789012345678' }),
    auth_id: z.string().openapi({ example: 'auth0|1234567890abcdef' }),
    member_id: z.string().openapi({ example: 'member-123' }),
}).openapi('User')

export const UpdateUserSchema = z.object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    name: z.string().openapi({ example: 'johndoe' }).nullable(),
    display_name: z.string().openapi({ example: 'John Doe' }).nullable(),
    grade: z.string().openapi({ example: 'A' }).nullable(),
    emergency_contact: z.string().openapi({ example: 'Jane Doe - 555-1234' }).nullable(),
    student_id: z.string().openapi({ example: 'S12345678' }).nullable(),
    student_email: z.string().email().openapi({ example: 'john.doe@student.example.com' }).nullable(),
    insurance: z.boolean().openapi({ example: true }).nullable(),
    some_allergy: z.boolean().openapi({ example: false }).nullable(),
    updated_at: z.string().openapi({ example: '2024-01-02T12:00:00Z' }).nullable(),
}).openapi('UpdateUserRequest')