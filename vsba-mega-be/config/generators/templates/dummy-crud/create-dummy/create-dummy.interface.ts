export interface create_dummy_function_params {
    first_name: string
    last_name: string
    user?: any
}

export interface create_dummy_function_return {
    code: number,
    message: string,
    data?: any,
}

export interface create_dummy_tests_interface {
    name: string,
    input: create_dummy_function_params,
    check_output?: (input: create_dummy_function_params, output: create_dummy_function_return) => void
}