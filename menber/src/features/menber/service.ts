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
    menber_id: 'member-123'
};

// create

export const createMenberService = async (c: Context<AppContext>) => {
    const body = await c.req.json();
    return c.json({ ...mockUser, ...body }, 201);
};


export const getMenberService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    console.log(`Admin fetching user: ${id}`);
    return c.json(mockUser, 200);
};

export const getMenbersByIdService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const ids = c.req.param('id');
    console.log(`Admin fetching users: ${ids}`);
    return c.json([mockUser], 200);
}

export const getMenbersByConditionService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    const body = await c.req.json();
    console.log(`Admin fetching users with condition:`, body);
    return c.json([mockUser], 200);
}

export const updateMenberService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    const body = await c.req.json();
    console.log(`Admin updating user ${id} with:`, body);
    return c.json({ ...mockUser, id, ...body }, 200);
};

export const updateMenberByIdService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    const body = await c.req.json();
    console.log(`Admin updating user ${id} with:`, body);
    return c.json({ ...mockUser, id, ...body }, 200);
}

export const deleteUserService = async (c: Context<AppContext>) => {
    const user = c.get('appUser');
    if (user.role !== 'admin') {
        throw new HTTPException(403, { message: 'Forbidden' });
    }
    const id = c.req.param('id');
    console.log(`Admin deleting user: ${id}`);
    return c.body(null, 204);
};