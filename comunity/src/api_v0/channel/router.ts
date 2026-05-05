/**
 * Channel API
 * 
 * メッセージ投稿の場となるチャンネルを管理します。
 * チャンネルごとのアクセス権限（Role）の管理もここで行います。
 */

import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { channelSchema, updateChannelSchema } from "./schema";
import { roleSchema } from "../role/schema";
import { AppContext } from "../../core/types";
import { authMiddleware } from "../../core/auth";
import {
    createChannelService,
    getChannelService,
    updateChannelService,
    deleteChannelService,
    getChannelRolesService,
    updateChannelRolesService
} from "./service";

// ***** channel *****
// チャンネルの管理
// path: /channel
// *****************

// --- Create ---

/**
 * 新規チャンネルの作成 (admin)
 */
const createChannelRoute = createRoute({
    method: "post",
    path: "/",
    middleware: [authMiddleware] as const,
    responses: {
        201: {
            description: "チャンネル作成成功",
            content: { "application/json": { schema: channelSchema } }
        }
    }
});

// --- Read ---

/**
 * チャンネル詳細の取得
 */
const getChannelRoute = createRoute({
    method: "get",
    path: "/{id}",
    middleware: [authMiddleware] as const,
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        200: {
            description: "チャンネル詳細取得成功",
            content: { "application/json": { schema: channelSchema } }
        }
    }
});

/**
 * チャンネルに割り当てられたロール一覧の取得
 */
const getChannelRolesRoute = createRoute({
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
 * チャンネルの更新 (admin)
 */
const updateChannelRoute = createRoute({
    method: "put",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() }),
        body: { content: { "application/json": { schema: updateChannelSchema } } }
    },
    responses: {
        200: {
            description: "チャンネル更新成功",
            content: { "application/json": { schema: channelSchema } }
        }
    }
});

/**
 * チャンネルのロール割り当て更新 (admin)
 */
const updateChannelRolesRoute = createRoute({
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
 * チャンネルの削除 (admin)
 */
const deleteChannelRoute = createRoute({
    method: "delete",
    path: "/{id}",
    request: {
        params: z.object({ id: z.string() })
    },
    responses: {
        204: {
            description: "チャンネル削除成功"
        }
    }
});

export const channelRouter = new OpenAPIHono<AppContext>()
    .openapi(createChannelRoute, createChannelService)
    .openapi(getChannelRoute, getChannelService)
    .openapi(getChannelRolesRoute, getChannelRolesService)
    .openapi(updateChannelRoute, updateChannelService)
    .openapi(updateChannelRolesRoute, updateChannelRolesService)
    .openapi(deleteChannelRoute, deleteChannelService);
