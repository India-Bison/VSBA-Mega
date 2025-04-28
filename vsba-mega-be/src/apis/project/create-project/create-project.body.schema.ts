import { z } from "zod";

export const create_project_body_schema = z.object({
    name: z.string(),
    full_venue_required: z.string().optional(),
    resource_type: z.union([z.string(), z.array(z.string())]).optional().openapi({ example: ['resource type'] }),
    description: z.string().optional(),
    audit_required: z.string().optional(),
    project_start_date: z.string().optional(),
    project_end_date: z.string().optional(),
    week_days: z.union([z.string(), z.array(z.string())]).optional(),
    slot_type: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    parent_id: z.number().optional(),
    slot_group: z.array(
        z.object({
            slot_start_date: z.string().optional(),
            slot_end_date: z.string().optional(),
            start_time: z.string().optional(),
            end_time: z.string().optional(),
            hours: z.string().optional(),
            slot_times: z.array(z.string()).optional(),
        })
    ).optional()
});
