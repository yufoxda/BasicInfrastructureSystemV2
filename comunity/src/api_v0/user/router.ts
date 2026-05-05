/**
 * User API
 * 
 * ユーザーの基本情報（プロフィール）および権限（Role）を管理します。
 * 自身の情報操作（/me）と、管理者による他者の情報操作（/{id}）をサポートします。
 */

import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { UserSchema, UpdateUserSchema } from "./schema";
import { roleSchema } from "../role/schema";
import type { AppContext } from "../../core/types";
import { 
    createUserService, 
    listUsersService,
    getUserMeService,
    getUserByIdService,
    updateUserMeService,
    updateUserByIdService,
    deleteUserByIdService,
    getUserRolesService,
    updateUserRolesService
} from "./service";

// ***** users *****
// ユーザー情報の管理
// path: /user
// *****************

// --- Create ---

/**
 * ユーザーの新規作成 (admin)
 */
const createUserRoute = createRoute({
    method: "post",
    path: "/",
    responses: {
        201: {
            description: "ユーザー作成成功",
            content: { "application/json": { schema: UserSchema } }
        }
    }
});

// --- Read ---

/**
 * ユーザー一覧の取得 (admin)
 */
const listUsersRoute = createRoute({
    method: "get",
    path: "/",
    responses: {
        200: {
            description: "ユーザー一覧取得成功",
            content: { "application/json": { schema: UserSchema.array() } }
        }
    }
});

/**
 * 自身のユーザー情報取得
 */
const getUserMeRoute = createRoute({
    method: "get",
    path: "/me",
    responses: {
        200: {
            description: "自身の情報取得成功",
            content: { "application/json": { schema: UserSchema } }
        }
    }
});

/**
 * 自身のロール一覧取得
 */
const getUserMeRolesRoute = createRoute({
    method: "get",
    path: "/me/role",
    responses: {
        200: {
            description: "自身のロール一覧取得成功",
            content: { "application/json": { schema: roleSchema.array() } }
        }
    }
});

/**
 * 特定ユーザーの情報取得 (admin)
 */
const getUserByIdRoute = createRoute({
    method: "get",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        200: {
            description: "特定ユーザーの情報取得成功",
            content: { "application/json": { schema: UserSchema } }
        }
    }
});

/**
 * 特定ユーザーのロール一覧取得 (admin)
 */
const getUserRolesByIdRoute = createRoute({
    method: "get",
    path: "/{id}/role",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        200: {
            description: "特定ユーザーのロール一覧取得成功",
            content: { "application/json": { schema: roleSchema.array() } }
        }
    }
});

// --- Update ---

/**
 * 自身のユーザー情報更新
 */
const updateUserMeRoute = createRoute({
    method: "put",
    path: "/me",
    request: {
        body: {
            content: { "application/json": { schema: UpdateUserSchema } }
        }
    },
    responses: {
        200: {
            description: "自身の情報更新成功",
            content: { "application/json": { schema: UserSchema } }
        }
    }
});

/**
 * 特定ユーザーの情報更新 (admin)
 */
const updateUserByIdRoute = createRoute({
    method: "put",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() }),
        body: {
            content: { "application/json": { schema: UpdateUserSchema } }
        }
    },
    responses: {
        200: {
            description: "特定ユーザーの情報更新成功",
            content: { "application/json": { schema: UserSchema } }
        }
    }
});

/**
 * 特定ユーザーのロール割り当て更新 (admin)
 */
const updateUserRolesRoute = createRoute({
    method: "put",
    path: "/{id}/role",
    request: {
        params: z.object({ id: z.string() }),
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        role_ids: z.string().array().openapi({ example: ["role-1", "role-2"] })
                    })
                }
            }
        }
    },
    responses: {
        200: {
            description: "ロール割り当て更新成功",
            content: { "application/json": { schema: roleSchema.array() } }
        }
    }
});

// --- Delete ---

/**
 * 特定ユーザーの削除 (admin)
 */
const deleteUserByIdRoute = createRoute({
    method: "delete",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        204: {
            description: "ユーザー削除成功"
        }
    }
});

export const userRouter = new OpenAPIHono<AppContext>()
    .openapi(createUserRoute, createUserService)
    .openapi(listUsersRoute, listUsersService)
    .openapi(getUserMeRoute, getUserMeService)
    .openapi(getUserMeRolesRoute, getUserRolesService)
    .openapi(getUserByIdRoute, getUserByIdService)
    .openapi(getUserRolesByIdRoute, getUserRolesService)
    .openapi(updateUserMeRoute, updateUserMeService)
    .openapi(updateUserByIdRoute, updateUserByIdService)
    .openapi(updateUserRolesRoute, updateUserRolesService)
    .openapi(deleteUserByIdRoute, deleteUserByIdService);
