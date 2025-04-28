import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let update_project_body_schema = {
    first_name: z.string().optional().openapi({ example: 'Akash' }),
    last_name: z.string().optional().openapi({ example: 'Sadavarte' })
};