import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let add_calendar_body_schema = {
    course_id: z.number().optional().openapi({ example: 1 }),
    school_id: z.number().optional().openapi({ example: 1 }),
    academic_year_id: z.number().optional().openapi({ example: 1 }),
    scheduled_date: z.string().optional().openapi({ example: '2024-12-10' })
};