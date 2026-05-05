import { createRoute , OpenAPIHono, z } from "@hono/zod-openapi"
import { channelSchema, updateChannelSchema} from "./schema" 
import { AppContext } from "../../core/types"
import { authMiddleware } from "../../core/auth"
import {
    createChunnelServce,
    getchannelServce,
    updatechannelServce,
    deletechannelServce
} from "./service"

// ***** chunnel *****
// チャンネルの管理
// 管理者(admin)のみが操作
// path: /chunnel
// *****************

// create
const createChunnelRoute = createRoute({
    method: 'post',
    path: '/',
    require: [authMiddleware] as const,
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
const getchannelRoute = createRoute({
    method: 'get',
    path: '/',
    require: [authMiddleware] as const,
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
const updatechannelRoute = createRoute({
    method: 'put',
    path: '/',
    request: {
        params: z.object({
            chunnelId: z.string().openapi({ example: 'user-123' }),
            chunneldata: updateChannelSchema
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
const deletechannelRoute = createRoute({
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

export const roleRouter = new OpenAPIHono<AppContext>()
    .openapi(createChunnelRoute, createChunnelServce)
    .openapi(getchannelRoute, getchannelServce)
    .openapi(updatechannelRoute, updatechannelServce)
    .openapi(deletechannelRoute, deletechannelServce)