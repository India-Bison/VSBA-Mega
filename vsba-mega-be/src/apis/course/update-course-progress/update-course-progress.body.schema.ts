import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let update_course_progress_body_schema = {
    school_id: z.number().optional().openapi({ example: 6 }),
    academic_year_id: z.number().optional().openapi({ example: 1 }),
    course_id: z.number().optional().openapi({ example: 3 }),
    main_course_id: z.number().optional().openapi({ example: 1 }),
    practical: z.boolean().optional().openapi({ example: true }),
    theory: z.boolean().optional().openapi({ example: true }),
    class_exercise: z.boolean().optional().openapi({ example: true }),
    pbl: z.boolean().optional().openapi({ example: true }),
    assessment: z.boolean().optional().openapi({ example: true }),
};