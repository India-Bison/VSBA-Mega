export interface get_main_course_calendar_list_function_params {
    school_id?: number,
    academic_year_id?: number,
    main_course_ids?: any[],
    page?: number
    page_size?: number
    sort_by?: string
    sort_order?: string
    search?: string
}

export interface get_main_course_calendar_list_function_return {
    code: number,
    message: string,
    count: number,
    data: any
}

export interface get_main_course_calendar_list_tests_interface {
    name: string,
    input: get_main_course_calendar_list_function_params,
    check_output?: (input: get_main_course_calendar_list_function_params, output: get_main_course_calendar_list_function_return) => void
}