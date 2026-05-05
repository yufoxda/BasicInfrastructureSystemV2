import { z } from "@hono/zod-openapi"

export const UserSchema = z.object({
    discord_user_id: z.string().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    display_name: z.string().openapi({ example: "John Doe" }),
    discord_id: z.string().nullable().openapi({ example: "123456789012345678" }),
    auth_user_id: z.string().nullable().openapi({ example: "auth0|1234567890abcdef" }),
    member_id: z.string().nullable().openapi({ example: "member-123" }),
    name: z.string().optional().openapi({ example: "John Doe" }),
    grade: z.number().optional().openapi({ example: 1 }),
    student_id: z.string().optional().openapi({ example: "S12345678" }),
    student_email: z.string().email().optional().openapi({ example: "john.doe@student.example.com" }),
}).openapi("User")

export const UpdateUserSchema = z.object({
    display_name: z.string().optional().openapi({ example: "John Doe" }),
}).openapi("UpdateUserRequest")