/**
 * Role API
 * 
 * ロールの定義（マスターデータ）を管理します。
 * システム全体で利用可能なロールの作成・一覧・更新・削除をサポートします。
 * （※ユーザーへの割り当ては User API で行います）
 */

import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { roleSchema, updateRoleSchema } from "./schema";
import type { AppContext } from "../../core/types";
import {
    createRoleService,
    listRolesService,
    getRoleByIdService,
    updateRoleService,
    deleteRoleService
} from "./service";

// ***** roles *****
// ロール定義の管理
// path: /role
// *****************

// --- Create ---

/**
 * 新しいロールを定義する (admin)
 */
const createRoleRoute = createRoute({
    method: "post",
    path: "/",
    request: {
        body: { content: { "application/json": { schema: roleSchema } } }
    },
    responses: {
        201: {
            description: "ロール作成成功",
            content: { "application/json": { schema: roleSchema } }
        }
    }
});

// --- Read ---

/**
 * 定義済みロールの一覧を取得
 */
const listRolesRoute = createRoute({
    method: "get",
    path: "/",
    responses: {
        200: {
            description: "ロール一覧取得成功",
            content: { "application/json": { schema: roleSchema.array() } }
        }
    }
});

/**
 * ロール定義の詳細を取得
 */
const getRoleByIdRoute = createRoute({
    method: "get",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        200: {
            description: "ロール詳細取得成功",
            content: { "application/json": { schema: roleSchema } }
        }
    }
});

// --- Update ---

/**
 * ロール定義を更新する (admin)
 */
const updateRoleRoute = createRoute({
    method: "put",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() }),
        body: { content: { "application/json": { schema: updateRoleSchema } } }
    },
    responses: {
        200: {
            description: "ロール更新成功",
            content: { "application/json": { schema: roleSchema } }
        }
    }
});

// --- Delete ---

/**
 * ロール定義を削除する (admin)
 */
const deleteRoleRoute = createRoute({
    method: "delete",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        204: {
            description: "ロール削除成功"
        }
    }
});

export const roleRouter = new OpenAPIHono<AppContext>()
    .openapi(createRoleRoute, createRoleService)
    .openapi(listRolesRoute, listRolesService)
    .openapi(getRoleByIdRoute, getRoleByIdService)
    .openapi(updateRoleRoute, updateRoleService)
    .openapi(deleteRoleRoute, deleteRoleService);
