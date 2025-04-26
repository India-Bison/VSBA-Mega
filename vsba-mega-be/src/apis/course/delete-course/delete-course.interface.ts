export interface delete_course_function_params {
    id: number
}

export interface delete_course_function_return {
    code: number,
    message: string,
}

export interface delete_course_tests_interface {
    name: string,
    input: delete_course_function_params,
    check_output?: (input: delete_course_function_params, output: delete_course_function_return) => void
}