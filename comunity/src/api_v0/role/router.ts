import { createRoute , OpenAPIHono, z } from "@hono/zod-openapi"
import { roleSchema, updateRoleSchema } from "./schema" 
import { AppContext } from "../../core/types"
import {
    createRoleService,
    getRolesService,
    getRolesByUserIdService,
    getRoleByRoleIdService,
    updateRolesService,
    updateRoleService,
    deleteRoleService
} from "./service"


// ***** roles *****
// ロール情報の管理
// /me: 自分自身の情報を操作
// /user/:userId: 特定ユーザーのロール操作 (admin)
// /:id: ロール自体の操作 (admin)
// path: /role
// *****************

// create 
// 割り当ててるroleの追加はupdateで
//adminのみ　role自体を作る
const createRoleRoute = createRoute({
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
const getRolesMeRoute = createRoute({
    method: 'get',
    path: '/me',
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
    path: '/user/{userId}',
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
    path: '/{roleId}',
    request: {
        params: z.object({
            roleId: z.string().openapi({ example: 'role-123' }),
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
const updateRolesByUserIdRoute = createRoute({
    method: 'put',
    path: '/user/{userId}',
    request: {
        params: z.object({
            userId: z.string().openapi({ example: 'user-123' }),
        }),
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        roleIds: z.string().array()
                    })
                }
            }
        }
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
    path: '/{roleId}',
    request: {
        params: z.object({
            roleId: z.string().openapi({ example: 'role-123' }),
        }),
        body: {
            content: {
                'application/json': {
                    schema: updateRoleSchema
                },
            },
        }
    },
    responses: {
        200: {
            description: 'roleの取得に成功',
            content: {
                'application/json': {
                    schema: roleSchema
                },
            },
        },
    },
})

// delete
// 割り当ててるroleの削除はupdateで
// adminのみ　role自体
const deleteRoleRoute = createRoute({
    method: 'delete',
    path: '/{roleId}',
    request: {
        params: z.object({
            roleId: z.string().openapi({ example: 'role-123' }),
        }),
    },
    responses: {
        200: {
            description: '削除完了'
        },
    },
})

export const roleRouter = new OpenAPIHono<AppContext>()
    .openapi(createRoleRoute, createRoleService)
    .openapi(getRolesMeRoute, getRolesService)
    .openapi(getRolesByUserIdRoute, getRolesByUserIdService)
    .openapi(getRoleByRoleIdRoute, getRoleByRoleIdService)
    .openapi(updateRolesByUserIdRoute, updateRolesService)
    .openapi(updateRoleRoute, updateRoleService)
    .openapi(deleteRoleRoute, deleteRoleService)
