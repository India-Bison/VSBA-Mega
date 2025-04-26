export interface dummy_api_function_params {
    name: string
}

export interface dummy_api_function_return {
    code: number,
    message: string,
}

export interface dummy_api_tests_interface {
    name: string,
    input: dummy_api_function_params,
    check_output?: (input: dummy_api_function_params, output: dummy_api_function_return) => void
}