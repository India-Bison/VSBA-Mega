import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_main_course_calendar_list_query_schema = {
    page: z.string().optional().openapi({ example: '1' }),
    page_size: z.string().optional().openapi({ example: '8' }),
    sort_by: z.string().optional().openapi({ example: '' }),
    sort_order: z.string().optional().openapi({ example: '' }),
    search: z.string().optional().openapi({ example: '' }),
};