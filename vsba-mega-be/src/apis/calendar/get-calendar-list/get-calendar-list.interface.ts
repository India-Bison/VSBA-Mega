export interface get_calendar_list_function_params {
    course_id?: number
    school_id?: number
    grade_id?: number
    academic_year_id?: number
}

export interface get_calendar_list_function_return {
    code: number,
    message: string,
    count: number,
    data: any
}

export interface get_calendar_list_tests_interface {
    name: string,
    input: get_calendar_list_function_params,
    check_output?: (input: get_calendar_list_function_params, output: get_calendar_list_function_return) => void
}