import type { Context } from 'hono'
import { AppContext } from '../../core/types'

const mockChannel = {
    id: 'channel-123',
    name: '雑談',
    categoryId: 'channel-123',
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z',
}


export const createChannelService = async (c: Context<AppContext> ) => {
    return c.json(mockChannel, 201);
}

export const getChannelService = async (c: Context<AppContext> ) => {
    return c.json(mockChannel, 200);
}

export const updateChannelService = async (c: Context<AppContext> ) => {
    return c.json(mockChannel, 200);
}

export const deleteChannelService =async (c: Context<AppContext> ) => {
    return c.json(null, 200);
}