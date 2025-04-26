export interface get_course_calendar_function_params {
    course_id?: number
    academic_year_id?: number
    instructor_id?: number
    school_id?: number
    page?: number
    page_size?: number
    sort_by?: string
    sort_order?: string
    search?: string
    user?:any
}

export interface get_course_calendar_function_return {
    code: number,
    message: string,
    count: number,
    data: any
}

export interface get_course_calendar_tests_interface {
    name: string,
    input: get_course_calendar_function_params,
    check_output?: (input: get_course_calendar_function_params, output: get_course_calendar_function_return) => void
}