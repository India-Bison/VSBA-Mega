import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_user_query_schema = {
    email_id: z.string().optional().openapi({ example: 'arun@gmail.com' })
};