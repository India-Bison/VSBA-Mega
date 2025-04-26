export interface add_calendar_function_params {
    course_id?: number
    school_id?: number
    scheduled_date?: string
    academic_year_id?: number
    user?:any
}

export interface add_calendar_function_return {
    code: number,
    message: string,
    data?: any
}

export interface add_calendar_tests_interface {
    name: string,
    input: add_calendar_function_params,
    check_output?: (input: add_calendar_function_params, output: add_calendar_function_return) => void
}