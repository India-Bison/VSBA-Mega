import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let get_main_course_calendar_list_body_schema = {
    school_id: z.number().openapi({ example: 1 }),
    academic_year_id: z.number().openapi({ example: 1 }),
    main_course_ids: z.number().array()
};