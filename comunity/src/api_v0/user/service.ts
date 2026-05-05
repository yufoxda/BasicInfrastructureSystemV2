import type { Context } from "hono"
import { AppContext } from "../../core/types"
import { HTTPException } from "hono/http-exception"

const mockUser = {
    discord_user_id: "123e4567-e89b-12d3-a456-426614174000",
    display_name: "John Doe",
    discord_id: "123456789012345678",
    auth_user_id: "auth0|1234567890abcdef",
    member_id: "member-123",
    name: "John Doe",
    grade: 1,
    student_id: "S12345678",
    student_email: "john.doe@student.example.com",
};

export const createUserService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body }, 201);
};

export const listUsersService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    return c.json([mockUser], 200);
};

export const getUserMeService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    return c.json({ ...mockUser, discord_user_id: user.id }, 200);
};

export const getUserByIdService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    const id = c.req.param("id");
    return c.json({ ...mockUser, discord_user_id: id }, 200);
};

export const updateUserMeService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body, discord_user_id: user.id }, 200);
};

export const updateUserByIdService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    const id = c.req.param("id");
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body, discord_user_id: id }, 200);
};

export const deleteUserByIdService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    if (user.role !== "admin") {
        throw new HTTPException(403, { message: "Forbidden" });
    }
    return c.body(null, 204);
};