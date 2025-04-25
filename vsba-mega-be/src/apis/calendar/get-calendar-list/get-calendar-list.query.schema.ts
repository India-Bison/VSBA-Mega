import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_calendar_list_query_schema = {
    course_id: z.string().optional().openapi({ example: '1' }),
    school_id: z.string().optional().openapi({ example: '1' }),
    grade_id: z.string().optional().openapi({ example: '1' }),
    academic_year_id: z.string().optional().openapi({ example: '1' }),
};