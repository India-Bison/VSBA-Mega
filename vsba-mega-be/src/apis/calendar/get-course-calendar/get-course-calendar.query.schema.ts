import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_course_calendar_query_schema = {
    course_id: z.string().optional().openapi({ example: '1r' }),
    academic_year_id: z.string().optional().openapi({ example: '1' }),
    school_id: z.string().optional().openapi({ example: '1' }),
    instructor_id: z.string().optional().openapi({ example: '1' }),
};