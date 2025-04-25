export interface add_course_function_params {
    front_end_unique_id?: string;
    start_day?: string;
    end_day?: string;
    name?: string;
    course_code?: string;
    description?: string;
    visibility: any;
    grade_id?: number;
    assessment_id?: number;
    assessment_type_id?: number;
    academic_year_id?: number;
    course_content?: string;
    number_of_levels?: string;
    subject_id?: number;
    language?: string;
    duration?: string;
    assessment_description?: string;
    total_marks?: string;
    is_assessment?: boolean;
    due_date?: string;
    materials?: study_material_schema[];
    levels?: any;
    user?: any;
    course_status?: string
    is_deleted?: boolean
}

export interface study_material_schema {
    material_type_id: number;
    id?: number | string;
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

export interface add_course_function_return {
    code: number,
    message: string,
    data?: any
}

export interface add_course_tests_interface {
    name: string,
    input: add_course_function_params,
    check_output?: (input: add_course_function_params, output: add_course_function_return) => void
}