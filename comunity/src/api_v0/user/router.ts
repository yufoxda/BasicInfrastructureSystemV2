import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { UserSchema, UpdateUserSchema } from "./schema";
import type { AppContext } from "../../core/types";
import { 
    createUserService, 
    getUserService,
    getUsersByIdService,
    updateUserService,
    updateUserByIdService,
    deleteUserByIdService,
} from "./service";

// ***** users *****
// ユーザー情報の管理
// 基本は / を使用して自分自身の情報を操作する
// 管理者(admin)のみが param idを渡して を使用して他者の情報を操作できる
// path: /users
// *****************

// create
// admin のみ
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
const getUserRoute = createRoute({
    method: 'get',
    path: '/',
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

// admin のみ 
// id で一括取得
const getUsersByIdRoute = createRoute({
    method: 'get',
    path: '/',
    request: {
        params: z.object({
            id: z.string().openapi({ example: 'user-123' }).array(),
        }),
    },
    responses: {
        200: {
            description: 'ユーザー情報の取得に成功',
            content: {
                'application/json': {
                    schema: UserSchema.array(),
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
// 自分自身の情報の更新
const updateUserRoute = createRoute({
    method: 'put',
    path: '/',
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

// admin のみ　id での更新
const updateUserByIdRoute = createRoute({
    method: 'put',
    path:'/',
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

// delete (admin only)
const deleteUserByIdRoute = createRoute({
    method: 'delete',
    path: '/',
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
    .openapi(getUserRoute, getUserService)
    .openapi(getUsersByIdRoute, getUsersByIdService)
    .openapi(updateUserRoute, updateUserService)
    .openapi(updateUserByIdRoute, updateUserByIdService)
    .openapi(deleteUserByIdRoute, deleteUserByIdService)


