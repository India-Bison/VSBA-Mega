export interface get_course_function_params {
    id: number
    language?: string
    user?: any
    school_id?: number
}

export interface get_course_function_return {
    code: number,
    message: string,
    data?: any
}

export interface get_course_tests_interface {
    name: string,
    input: get_course_function_params,
    check_output?: (input: get_course_function_params, output: get_course_function_return) => void
}