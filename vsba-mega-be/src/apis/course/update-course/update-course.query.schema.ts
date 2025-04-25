import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let update_course_query_schema = {
    id: z.string().optional().openapi({ example: '1' })
};