export interface get_dummy_function_params {
    query: {
        id: number
    },
    user?: any
}

export interface get_dummy_function_return {
    code: number,
    message: string,
    data?: any
}

export interface get_dummy_tests_interface {
    name: string,
    input: get_dummy_function_params,
    check_output?: (input: get_dummy_function_params, output: get_dummy_function_return) => void
}