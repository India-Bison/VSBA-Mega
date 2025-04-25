import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_course_query_schema = {
    id: z.string().openapi({ example: '' }),
    school_id: z.string().optional().openapi({ example: '' }),
    language: z.string().optional().openapi({ example: '' })
};