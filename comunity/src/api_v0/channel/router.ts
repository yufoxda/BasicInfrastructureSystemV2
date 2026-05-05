import { createRoute , OpenAPIHono, z } from "@hono/zod-openapi"
import { channelSchema, updateChannelSchema} from "./schema" 
import { AppContext } from "../../core/types"
import { authMiddleware } from "../../core/auth"
import {
    createChannelService,
    getChannelService,
    updateChannelService,
    deleteChannelService
} from "./service"

// ***** channel *****
// チャンネルの管理
// 管理者(admin)のみが操作
// path: /channel
// *****************

// create
const createChannelRoute = createRoute({
    method: 'post',
    path: '/',
    middleware: [authMiddleware] as const,
    responses: {
        201: {
            description: 'channel作成に成功',
            content: {
                'application/json':{
                    schema: channelSchema,
                }
            }
        },
        400: {
            description: 'リクエスト不正',
        }
    }
})


// read
const getChannelRoute = createRoute({
    method: 'get',
    path: '/',
    middleware: [authMiddleware] as const,
    responses: {
        200: {
            description: 'チャンネル情報の取得に成功',
            content: {
                'application/json': {
                    schema: channelSchema,
                },
            },
        },
        
    },
})

// update
const updateChannelRoute = createRoute({
    method: 'put',
    path: '/',
    request: {
        params: z.object({
            channelId: z.string().openapi({ example: 'user-123' }),
            channelData: updateChannelSchema
        }),
    },
    responses: {
        200: {
            description: 'roleの取得に成功',
            content: {
                'application/json': {
                    schema: channelSchema,
                },
            },
        },
    },
})


// delete
const deleteChannelRoute = createRoute({
    method: 'delete',
    path: '/',
    request: {
        params: z.object({
            channelId: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        200: {
            description: '削除完了'
        },
    },
})

export const channelRouter = new OpenAPIHono<AppContext>()
    .openapi(createChannelRoute, createChannelService)
    .openapi(getChannelRoute, getChannelService)
    .openapi(updateChannelRoute, updateChannelService)
    .openapi(deleteChannelRoute, deleteChannelService)