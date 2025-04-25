export interface update_course_function_params {
    id?: number;
    front_end_unique_id?: string;
    start_day?: string;
    end_day?: string;
    name?: string;
    course_code?: string;
    description?: string;
    visibility: any;
    grade_id?: number;
    academic_year_id?: number;
    course_content?: string;
    number_of_levels?: string;
    subject_id?: number;
    language?: string;
    duration?: string;
    assessment_type_id?: number;
    assessment_description?: string;
    total_marks?: string;
    is_assessment?: boolean;
    due_date?: string;
    levels?: any;
    user?: any;
    course_status?: any
    materials?: study_material_update_schema[];
    is_deleted?: boolean
    assessment_status?: string
}

export interface study_material_update_schema {
    material_type_id?: number;
    id?: number;
    name?: string;
    language?: string;
    visibility?: string;
    value?: string;
    course_id?: number;
    main_course_id?: number;
    front_end_unique_id?: number;
    status?: string
    is_deleted?: boolean
}

export interface update_course_function_return {
    code: number,
    message: string,
    data?: any
}

export interface update_course_tests_interface {
    name: string,
    input: update_course_function_params,
    check_output?: (input: update_course_function_params, output: update_course_function_return) => void
}