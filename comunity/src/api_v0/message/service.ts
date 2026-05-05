import type { Context } from "hono"
import { AppContext } from "../../core/types"

const mockMessage = {
    id: "msg-123",
    channelId: "channel-123",
    userId: "user-123",
    content: "Hello, World!",
    created_at: "2024-01-01T12:00:00Z",
    updated_at: "2024-01-02T12:00:00Z",
};

export const createMessageService = async (c: Context<AppContext>) => {
    const user = c.get("appUser");
    const body = await c.req.json();
    console.log(`Message created by ${user.id} in ${body.channelId}`);
    return c.json({ ...mockMessage, userId: user.id, ...body }, 201);
};
