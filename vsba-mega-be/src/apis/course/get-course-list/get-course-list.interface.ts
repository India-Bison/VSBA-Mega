export interface get_course_list_function_params {
    id?: number
    user?: any
    page?: number
    page_size?: number
    sort_by?: string
    sort?: string
    sort_order?: string
    search?: string
    grade_id?: number
    subject_id?: number
    academic_year_id?: number
    language?: string
}

export interface get_course_list_function_return {
    code: number,
    message: string,
    data?: any,
    count?: number
}

export interface get_course_list_tests_interface {
    name: string,
    input: get_course_list_function_params,
    check_output?: (input: get_course_list_function_params, output: get_course_list_function_return) => void
}