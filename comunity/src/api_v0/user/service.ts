import type { Context } from 'hono'
import { AppContext } from '../../core/types'
import { HTTPException } from 'hono/http-exception'

const mockUser = {
    id: 'user-123',
    name: 'johndoe',
    display_name: 'John Doe',
    grade: 'A',
    emergency_contact: 'Jane Doe - 555-1234',
    student_id: 'S12345678',
    student_email: 'john.doe@student.example.com',
    insurance: true,
    some_allergy: false,
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z',
    discord_id: '123456789012345678',
    auth_id: 'auth0|1234567890abcdef',
    member_id: 'member-123'
};

export const createUserService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body }, 201);
};

export const listUsersService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    // 実際にはDBから一覧を取得
    return c.json([mockUser], 200);
};

export const getUserMeService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    console.log(`Fetching info for current user: ${user.id}`);
    return c.json(mockUser, 200);
};

export const getUserByIdService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    console.log(`Admin fetching user: ${id}`);
    return c.json(mockUser, 200);
};

export const updateUserMeService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    const body = await c.req.json();
    console.log(`Updating current user ${user.id} with:`, body);
    return c.json({ ...mockUser, ...body }, 200);
};

export const updateUserByIdService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    const body = await c.req.json();
    console.log(`Admin updating user ${id} with:`, body);
    return c.json({ ...mockUser, ...body }, 200);
};

export const deleteUserByIdService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    console.log(`Admin deleting user: ${id}`);
    return c.body(null, 204);
};
