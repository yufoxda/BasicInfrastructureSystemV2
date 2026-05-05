import type { Context } from 'hono'
import { AppContext } from '../../core/types'

const mockChannel = {
  channel_id: "123e4567-e89b-12d3-a456-426614174000" ,
    channel_name: "admin" ,
    category_id: "123e4567-e89b-12d3-a456-426614174000"
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