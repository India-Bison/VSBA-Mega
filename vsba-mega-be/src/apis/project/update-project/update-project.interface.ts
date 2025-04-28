export interface update_project_function_params {
    query: {
        id: number
    },
    body: {
        name?: string;
        short_name?: string;
        full_venue_required?: string;
        resource_type?: any
        description?: string;
        audit_required?: string;
        project_start_date?: string;
        project_end_date?: string;
        week_days?: string | string[];
        slot_type?: string;
        type?: string;
        status?: string;
        parent_id?: number;
        updated_by_id?: number;
        slot_groups?: {
            slot_start_date?: string;
            slot_end_date?: string;
            start_time?: string;
            end_time?: string;
            hours?: string;
            slot_times?: string | string[];
        }[];
    };
    user?: any;
}

export interface update_project_function_return {
    code: number
    message: string
    data?: any
}

export interface update_project_tests_interface {
    name: string,
    input: update_project_function_params,
    check_output?: (input: update_project_function_params, output: update_project_function_return) => void
}