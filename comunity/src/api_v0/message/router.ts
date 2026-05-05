import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { messageSchema, createMessageSchema } from "./schema";
import type { AppContext } from "../../core/types";
import { createMessageService } from "./service";

// ***** message *****
// メッセージの送信
// path: /message
// *****************

const createMessageRoute = createRoute({
    method: "post",
    path: "/",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createMessageSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "メッセージの送信に成功",
            content: {
                "application/json": {
                    schema: messageSchema,
                },
            },
        },
    },
});

export const messageRouter = new OpenAPIHono<AppContext>()
    .openapi(createMessageRoute, createMessageService);
