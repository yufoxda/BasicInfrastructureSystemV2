import type { Context } from 'hono'
import { AppContext } from '../../core/types'

const mockchannel = {
    id: 'channel-123',
    name: '雑談',
    categoryId: 'channel-123',
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-01-02T12:00:00Z',
}


export const createChunnelServce = async (c: Context<AppContext> ) => {
    return c.json(mockchannel, 201);
}

export const getchannelServce = async (c: Context<AppContext> ) => {
    return c.json(mockchannel, 200);
}

export const updatechannelServce = async (c: Context<AppContext> ) => {
    return c.json(mockchannel, 200);
}

export const deletechannelServce =async (c: Context<AppContext> ) => {
    return c.json(null, 200);
}