import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { categorySchema, createCategorySchema, updateCategorySchema } from "./schema";
import type { AppContext } from "../../core/types";
import { 
    createCategoryService,
    listCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService
} from "./service";

// ***** category *****
// カテゴリの管理 adminのみ
// /:id:カテゴリの自体の操作
//********************* 

// create
const createCategoryRoute = createRoute({
    method: "post",
    path: "/",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createCategorySchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "カテゴリの作成に成功",
            content: {
                "application/json": {
                    schema: categorySchema,
                },
            },
        },
        403: { description: "権限がありません" },
    },
});

// read
const listCategoriesRoute = createRoute({
    method: "get",
    path: "/",
    responses: {
        200: {
            description: "カテゴリ一覧の取得に成功",
            content: {
                "application/json": {
                    schema: categorySchema.array(),
                },
            },
        },
    },
});


const getCategoryByIdRoute = createRoute({
    method: "get",
    path: "/{id}",
    request: {
        params: z.object({
            id: z.string().openapi({ example: "cat-123" }),
        }),
    },
    responses: {
        200: {
            description: "カテゴリ情報の取得に成功",
            content: {
                "application/json": {
                    schema: categorySchema,
                },
            },
        },
        404: { description: "カテゴリが見つからない" },
    },
});

// update
const updateCategoryRoute = createRoute({
    method: "put",
    path: "/{id}",
    request: {
        params: z.object({
            id: z.string().openapi({ example: "cat-123" }),
        }),
        body: {
            content: {
                "application/json": {
                    schema: updateCategorySchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "カテゴリの更新に成功",
            content: {
                "application/json": {
                    schema: categorySchema,
                },
            },
        },
        403: { description: "権限がありません" },
    },
});

// delete
const deleteCategoryRoute = createRoute({
    method: "delete",
    path: "/{id}",
    request: {
        params: z.object({
            id: z.string().openapi({ example: "cat-123" }),
        }),
    },
    responses: {
        204: { description: "カテゴリの削除に成功" },
        403: { description: "権限がありません" },
    },
});

export const categoryRouter = new OpenAPIHono<AppContext>()
    .openapi(createCategoryRoute, createCategoryService)
    .openapi(listCategoriesRoute, listCategoriesService)
    .openapi(getCategoryByIdRoute, getCategoryByIdService)
    .openapi(updateCategoryRoute, updateCategoryService)
    .openapi(deleteCategoryRoute, deleteCategoryService);
