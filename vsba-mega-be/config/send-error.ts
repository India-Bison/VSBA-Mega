import { Context } from "hono"

export let send_error = (c: Context, error: any, code: any, details: any) => {
    console.error(details.api_name, '| Api Error Encountered |', error)
    return c.json(error, code)
}