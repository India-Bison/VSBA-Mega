export interface get_dummy_list_function_params {
    query?: any
    body?: any
    user?: any
}

export interface get_dummy_list_function_return {
    code: number
    message: string
    data?: any
    count?: number
}

export interface get_dummy_list_tests_interface {
    name: string,
    input: get_dummy_list_function_params,
    check_output?: (input: get_dummy_list_function_params, output: get_dummy_list_function_return) => void
}