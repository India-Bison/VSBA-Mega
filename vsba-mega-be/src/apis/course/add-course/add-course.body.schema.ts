import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const study_material_schema = z.object({
    material_type_id: z.number().optional().openapi({ example: 5 }),
    id: z.union([z.number().int(), z.string().optional()]).optional(),
    name: z.string().optional().openapi({ example: "Material Name" }),
    language: z.string().optional().openapi({ example: "English" }),
    visibility: z.array(z.string()).optional().openapi({ example: ["Instructor"] }),
    topic_content: z.any().optional().openapi({ example: ["Material Content"] }),
    value: z.any().optional().openapi({ example: ["Material Content"] }),
    status: z.string().optional().openapi({ example: "No Change" }),
    type: z.string().optional().openapi({ example: "No Change" }),
    course_id: z.number().optional().openapi({ example: 1 }),
    is_deleted: z.boolean().nullable().optional().openapi({ example: false }),
    main_course_id: z.number().optional().openapi({ example: 1 }),
    front_end_unique_id: z.string().optional().openapi({ example: "abc-123" }),
});

export let add_course_body_schema = z.object({
    front_end_unique_id: z.string().optional().openapi({ example: "course-123" }),
    start_day: z.string().optional().openapi({ example: "2025-03-10" }),
    end_day: z.string().optional().openapi({ example: "2025-06-10" }),
    name: z.string().optional().openapi({ example: "Mathematics Level 1" }),
    course_code: z.string().optional().openapi({ example: "MATH101" }),
    description: z.string().optional().openapi({ example: "Introduction to Mathematics" }),
    visibility: z.any().optional().openapi({ example: "Basic Algebra and Arithmetic" }),
    grade_id: z.number().optional().openapi({ example: 1 }),
    academic_year_id: z.number().optional().openapi({ example: 1 }),
    course_content: z.any().optional().openapi({ example: "Basic Algebra and Arithmetic" }),
    number_of_levels: z.number().optional().openapi({ example: 3 }),
    order: z.number().optional().openapi({ example: 3 }),
    subject_id: z.number().optional().openapi({ example: 1 }),
    language: z.any().optional().openapi({ example: "Basic Algebra and Arithmetic" }),
    hindi_name: z.string().optional().openapi({ example: "Hindi Name" }),
    marathi_name: z.string().optional().openapi({ example: "Marathi Name" }),
    english_course_status: z.string().optional().openapi({ example: "Enabled" }),
    hindi_course_status: z.string().optional().openapi({ example: "Draft" }),
    marathi_course_status: z.string().optional().openapi({ example: "Disabled" }),
    duration: z.string().optional().openapi({ example: "3 months" }),
    course_status: z.string().optional().openapi({ example: "No Change" }),
    is_assessment: z.boolean().optional().openapi({ example: false }),
    assessment_type_id: z.number().optional().nullable().openapi({ example: 1 }),
    total_marks: z.string().optional().nullable().openapi({ example: "90" }),
    is_deleted: z.boolean().nullable().optional().openapi({ example: false }),
    due_date: z.string().optional().nullable().openapi({ example: "2025-03-20" }),
    assessment_description: z.string().nullable().optional().openapi({ example: "3 months" }),
    materials: z.array(study_material_schema).optional(),
    levels: z.any().optional(),
});