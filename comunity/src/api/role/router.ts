import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { RoleSchema, UpdateRoleSchema  } from "./schema";
import type { AppContext } from "../../types";
import { 
    createRoleService,
    deleteRoleByRoleIdService,
    deleteRoleService,
    getRolesByIdService,
    getRolesService,
    updateRoleByIdService,
    updateRoleService
} from "./service";
import { authMiddleware } from "../core/auth";


// create
// ロール自体の作成 admin
const createRoleRoute = createRoute({
    method: 'post',
    path: '/',
    require: [authMiddleware] as const,
    responses: {
        201: {
            description: 'ロールの作成に成功',
            content: {
                'application/json': {
                    schema: RoleSchema,
                },
            },
        },
        400: {
            description: 'リクエストが不正',
        },
    },
});

// 自分でroleをつけることはできない
// adminはupdateで行う。

// read
// 自分ののロール
const getRolesRote = createRoute({
    method: 'get',
    path:'/',
    responses: {
        200:{
            description: 'ロールの取得に成功',
            content: {
                'application/json': {
                    schema: RoleSchema.array(),
                },
            },
        }
    }
})

// 他人のロール　admin
const getRolesByIdRoute = createRoute({
    method: 'get',
    path:'/',
    require: [authMiddleware] as const,
    request: {
        params: z.object({
            userid: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        200: {
            description: 'ロールの取得に成功',
            content: {
                'application/json': {
                    schema: RoleSchema.array(),
                },
            },
        },
        403: {
            description: '権限がありません',
        },
        404: {
            description: 'ユーザーが見つからない',
        },
    },

})

// update
// 自分であってもroleの付けることはできない　削除は可能

// ロール自体の変更
const updateRoleRote = createRoute({
    method: 'put',
    path: '/',
    require: [authMiddleware] as const,
    request: {
        params: z.object({
            roleid: z.string().openapi({ example: 'user-123'}),
            updatedata: UpdateRoleSchema
        }),
    },
    responses: {
        201: {
            description: 'ロールのupdateに成功',
            content: {
                'application/json': {
                    schema: UpdateRoleSchema,
                },
            },
        },
        400: {
            description: 'リクエストが不正',
        },
    },
})

// 他人の admin
const updateRoleByIdRoute = createRoute({
    method: 'put',
    path:'/',
    require: [authMiddleware] as const,
    request: {
        params: z.object({
            userid: z.string().openapi({ example: 'user-123' }),
            roleid: z.string().openapi({ example: 'user-123'}).array()
        }),
    },
    responses: {
        200: {
            description: 'ロールの取得に成功',
            content: {
                'application/json': {
                    schema: RoleSchema.array(),
                },
            },
        },
        403: {
            description: '権限がありません',
        },
        404: {
            description: 'ユーザーが見つからない',
        },
    },
})

// delete

// ロール自体の削除　admin
const deleteRoleRoute = createRoute({
    method: 'delete',
    path: '/',
    require: [authMiddleware] as const,
    request: {
        params: z.object({
            id: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        204: {
            description: 'ロールの削除に成功',
        },
        403: {
            description: '権限がありません',
        },
        404: {
            description: 'ロールが見つからない',
        },
    },
})

// roleを外す　非admin adminはupdateで行う
const deleteRoleByRoleIdRoute = createRoute({
    method: 'delete',
    path: '/',
    request: {
        params: z.object({
            id: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        204: {
            description: 'ロールの削除に成功',
            content:{
                'application/json': {
                    schema: RoleSchema.array(),// 削除後のロール一覧
                },
            }
        },
        403: {
            description: '権限がありません',
        },
        404: {
            description: 'ロールが見つからない',
        },
    },
})

// --- 

export const roleRouter = new OpenAPIHono<AppContext>()
    .openapi(createRoleRoute, createRoleService)
    .openapi(getRolesRote, getRolesService)
    .openapi(getRolesByIdRoute, getRolesByIdService)
    .openapi(updateRoleRote, updateRoleService)
    .openapi(updateRoleByIdRoute, updateRoleByIdService)
    .openapi(deleteRoleRoute, deleteRoleService)
    .openapi(deleteRoleByRoleIdRoute,deleteRoleByRoleIdService)


