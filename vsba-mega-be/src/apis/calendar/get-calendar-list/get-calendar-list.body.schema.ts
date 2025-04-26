import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_calendar_list_body_schema = {
    name: z.string().optional().openapi({ example: 'Akash' })
};