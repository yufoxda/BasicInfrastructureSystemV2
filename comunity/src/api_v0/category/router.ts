/**
 * Category API
 * 
 * チャンネルをグループ化するためのカテゴリを管理します。
 * カテゴリごとのアクセス権限（Role）の管理もここで行います。
 */

import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { categorySchema, createCategorySchema, updateCategorySchema } from "./schema";
import { roleSchema } from "../role/schema";
import type { AppContext } from "../../core/types";
import { 
    createCategoryService,
    listCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
    getCategoryRolesService,
    updateCategoryRolesService
} from "./service";

// ***** category *****
// カテゴリの管理
// path: /category
// *****************

// --- Create ---

/**
 * 新規カテゴリの作成 (admin)
 */
const createCategoryRoute = createRoute({
    method: "post",
    path: "/",
    request: {
        body: { content: { "application/json": { schema: createCategorySchema } } }
    },
    responses: {
        201: {
            description: "カテゴリ作成成功",
            content: { "application/json": { schema: categorySchema } }
        }
    }
});

// --- Read ---

/**
 * カテゴリ一覧の取得
 */
const listCategoriesRoute = createRoute({
    method: "get",
    path: "/",
    responses: {
        200: {
            description: "カテゴリ一覧取得成功",
            content: { "application/json": { schema: categorySchema.array() } }
        }
    }
});

/**
 * カテゴリ詳細の取得
 */
const getCategoryByIdRoute = createRoute({
    method: "get",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        200: {
            description: "カテゴリ詳細取得成功",
            content: { "application/json": { schema: categorySchema } }
        }
    }
});

/**
 * カテゴリに割り当てられたロール一覧の取得
 */
const getCategoryRolesRoute = createRoute({
    method: "get",
    path: "/{id}/role",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        200: {
            description: "ロール一覧取得成功",
            content: { "application/json": { schema: roleSchema.array() } }
        }
    }
});

// --- Update ---

/**
 * カテゴリの更新 (admin)
 */
const updateCategoryRoute = createRoute({
    method: "put",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() }),
        body: { content: { "application/json": { schema: updateCategorySchema } } }
    },
    responses: {
        200: {
            description: "カテゴリ更新成功",
            content: { "application/json": { schema: categorySchema } }
        }
    }
});

/**
 * カテゴリのロール割り当て更新 (admin)
 */
const updateCategoryRolesRoute = createRoute({
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
 * カテゴリの削除 (admin)
 */
const deleteCategoryRoute = createRoute({
    method: "delete",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        204: {
            description: "カテゴリ削除成功"
        }
    }
});

export const categoryRouter = new OpenAPIHono<AppContext>()
    .openapi(createCategoryRoute, createCategoryService)
    .openapi(listCategoriesRoute, listCategoriesService)
    .openapi(getCategoryByIdRoute, getCategoryByIdService)
    .openapi(updateCategoryRoute, updateCategoryService)
    .openapi(deleteCategoryRoute, deleteCategoryService)
    .openapi(getCategoryRolesRoute, getCategoryRolesService)
    .openapi(updateCategoryRolesRoute, updateCategoryRolesService);
