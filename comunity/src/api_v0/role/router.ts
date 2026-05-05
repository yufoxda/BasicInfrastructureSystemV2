import { createRoute , OpenAPIHono, z } from "@hono/zod-openapi"
import { roleSchema, updateRoleSchema } from "./shcema" 
import { AppContext } from "../../core/types"
import {
    createRoleService,
    getRolesService,
    getRolesByUserIdService,
    getRoleByRolrIdService,
    updateRolesService,
    updateRoleService,
    deleteRoleService
} from "./service"


// ***** roles *****
// ユーザー情報の管理
// 基本は / を使用して自分自身の情報,role情報を取得
// 管理者(admin)のみが操作
// path: /role
// *****************

// create 
// 割り当ててるroleの追加はupdateで
//adminのみ　role自体を作る
const createroleRoute = createRoute({
    method: 'post',
    path: '/',
    responses: {
        201: {
            description: 'ロールの作成に成功',
            content: {
                'application/json':{
                    schema: roleSchema,
                }
            }
        },
        400: {
            description: 'リクエスト不正',
        }
    }
})

// read
// 自身のrole
const getRolesRoute = createRoute({
    method: 'get',
    path: '/',
    responses: {
        200: {
            description: '自身のユーザー情報の取得に成功',
            content: {
                'application/json': {
                    schema: roleSchema.array(),
                },
            },
        },
        
    },
})

// admin 他人のロール
const getRolesByUserIdRoute = createRoute({
    method: 'get',
    path: '/',
    request: {
        params: z.object({
            userId: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        200: {
            description: 'roleの取得に成功',
            content: {
                'application/json': {
                    schema: roleSchema.array(),
                },
            },
        },
        
    },
})

// role自体の取得
const getRoleByRoleIdRoute = createRoute({
    method: 'get',
    path: '/',
    request: {
        params: z.object({
            roleId: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        200: {
            description: 'roleの取得に成功',
            content: {
                'application/json': {
                    schema: roleSchema,
                },
            },
        },
        
    },
})

// update
// 自身のroleの操作は禁止

// 他人のロールの更新
const updateRolesRoute = createRoute({
    method: 'put',
    path: '/',
    request: {
        params: z.object({
            userId: z.string().openapi({ example: 'user-123' }),
            roleIds: z.string().openapi({ example: 'user-123' }).array()
        }),
    },
    responses: {
        200: {
            description: 'roleの取得に成功',
            content: {
                'application/json': {
                    schema: roleSchema.array(),
                },
            },
        },
    },
})

// role自体の更新 admin
const updateRoleRoute = createRoute({
    method: 'put',
    path: '/',
    request: {
        params: z.object({
            role: updateRoleSchema
        }),
    },
    responses: {
        200: {
            description: 'roleの取得に成功',
            content: {
                'application/json': {
                    schema: updateRoleSchema
                },
            },
        },
    },
})

// delete
// 割り当ててるroleの削除はupdateで
// adminのみ　role自体
const deleteRoleROute = createRoute({
    method: 'delete',
    path: '/',
    request: {
        params: z.object({
            roleId: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        200: {
            description: '削除完了'
        },
    },
})

export const roleRouter = new OpenAPIHono<AppContext>()
    .openapi(createroleRoute, createRoleService)
    .openapi(getRolesRoute, getRolesService)
    .openapi(getRolesByUserIdRoute, getRolesByUserIdService)
    .openapi(getRoleByRoleIdRoute, getRoleByRolrIdService)
    .openapi(updateRolesRoute, updateRolesService)
    .openapi(updateRoleRoute, updateRoleService)
    .openapi(deleteRoleROute, deleteRoleService)
