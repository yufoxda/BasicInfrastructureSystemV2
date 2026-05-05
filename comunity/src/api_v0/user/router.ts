import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { UserSchema, UpdateUserSchema } from "./schema";
import type { AppContext } from "../../core/types";
import { 
    createUserService, 
    listUsersService,
    getUserMeService,
    getUserByIdService,
    updateUserMeService,
    updateUserByIdService,
    deleteUserByIdService,
} from "./service";

// ***** users *****
// ユーザー情報の管理
// /me: 自分自身の情報を操作する
// /:id: 管理者(admin)のみが他者の情報を操作できる
// /: 一覧取得や作成
// path: /user
// *****************

// create (admin only)
const createUserRoute = createRoute({
    method: 'post',
    path: '/',
    responses: {
        201: {
            description: 'ユーザーの作成に成功',
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
        },
        400: {
            description: 'リクエストが不正',
        },
    },
});

// read

// list (admin only)
const listUsersRoute = createRoute({
    method: 'get',
    path: '/',
    responses: {
        200: {
            description: 'ユーザー一覧の取得に成功',
            content: {
                'application/json': {
                    schema: UserSchema.array(),
                },
            },
        },
        403: {
            description: '権限がありません',
        },
    },
})

// 自身
const getUserMeRoute = createRoute({
    method: 'get',
    path: '/me',
    responses: {
        200: {
            description: '自身のユーザー情報の取得に成功',
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
        },
        401: {
            description: '認証エラー',
        },
    },
})

//  特定ID (admin only)
const getUserByIdRoute = createRoute({
    method: 'get',
    path: '/{id}',
    request: {
        params: z.object({
            id: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        200: {
            description: 'ユーザー情報の取得に成功',
            content: {
                'application/json': {
                    schema: UserSchema,
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

// update 自身
const updateUserMeRoute = createRoute({
    method: 'put',
    path: '/me',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: UpdateUserSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: '自身のユーザー情報の更新に成功',
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
        },
        400: {
            description: 'リクエストが不正',
        },
        401: {
            description: '認証エラー',
        },
    },
})

// update 特定ID (admin only)
const updateUserByIdRoute = createRoute({
    method: 'put',
    path:'/{id}',
    request: {
        params: z.object({
            id: z.string().openapi({ example: 'user-123' }),
        }),
        body: {
            content: {
                'application/json': {
                    schema: UpdateUserSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'ユーザー情報の更新に成功',
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
        },
        403: {
            description: '権限がありません',
        },
        400: {
            description: 'リクエストが不正',
        },
        404: {
            description: 'ユーザーが見つからない',
        },
    },
})

// delete 特定ID (admin only)
const deleteUserByIdRoute = createRoute({
    method: 'delete',
    path: '/{id}',
    request: {
        params: z.object({
            id: z.string().openapi({ example: 'user-123' }),
        }),
    },
    responses: {
        204: {
            description: 'ユーザーの削除に成功',
        },
        403: {
            description: '権限がありません',
        },
        404: {
            description: 'ユーザーが見つからない',
        },
    },
})

// --- api ---

export const userRouter = new OpenAPIHono<AppContext>()
    .openapi(createUserRoute, createUserService)
    .openapi(listUsersRoute, listUsersService)
    .openapi(getUserMeRoute, getUserMeService)
    .openapi(getUserByIdRoute, getUserByIdService)
    .openapi(updateUserMeRoute, updateUserMeService)
    .openapi(updateUserByIdRoute, updateUserByIdService)
    .openapi(deleteUserByIdRoute, deleteUserByIdService)
