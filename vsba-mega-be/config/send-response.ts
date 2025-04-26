import { Context } from "hono"

export let send_response = (c: Context, success: any, code: any, details: any) => {
    return c.json(success, code)
}