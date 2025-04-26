import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let update_course_progress_query_schema = {
    instructor_id: z.string().optional().openapi({ example: '1' }),
    school_id: z.string().optional().openapi({ example: '1' }),
    academic_year_id: z.string().optional().openapi({ example: '1' }),
    main_course_id: z.string().optional().openapi({ example: '1' }),
    course_id: z.string().optional().openapi({ example: '1' }),
};