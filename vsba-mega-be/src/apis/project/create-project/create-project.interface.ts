export interface create_project_function_params {
    query?: {},
    body: {
        name: string;
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
        project_logo?: string;
        draft_json?: any;
        parent_id?: number;
        slot_groups?: {
            slot_start_date?: string;
            slot_end_date?: string;
            start_time?: string;
            end_time?: string;
            hours?: string;
            slot_time_group?: string | string[];
            slot_time?: string;
        }[];
    };
    user?: any;
}

export interface create_project_function_return {
    code: number
    message: string
    data?: any
}

export interface create_project_tests_interface {
    name: string,
    input: create_project_function_params,
    check_output?: (input: create_project_function_params, output: create_project_function_return) => void
}