import { optional, z } from "zod";

export const create_project_body_schema = z.object({
    name: z.string().optional().nullable(),
    short_name: z.string().optional().nullable(),
    full_venue_required: z.string().optional().nullable(),
    resource_type: z.union([z.string(), z.array(z.string())]).optional().nullable().openapi({ example: ['resource type'] }),
    description: z.string().optional().nullable(),
    audit_required: z.string().optional().nullable(),
    project_start_date: z.string().optional().nullable(),
    project_end_date: z.string().optional().nullable(),
    week_days: z.union([z.string(), z.array(z.string())]).optional().nullable(),
    slot_type: z.string().optional().nullable(),
    type: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    project_logo: z.string().optional().nullable(),
    parent_id: z.number().optional().nullable(),
    slot_groups: z.array(
        z.object({
            slot_start_date: z.string().optional().nullable(),
            slot_end_date: z.string().optional().nullable(),
            start_time: z.string().optional().nullable(),
            end_time: z.string().optional().nullable(),
            hours: z.string().optional().nullable(),
            slot_time_group: z.array(z.string()).optional().nullable(),
            slot_time: z.string().optional().nullable(),
        })
    ).optional().nullable()
});
