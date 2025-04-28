export interface delete_dummy_function_params {
    query: {
        id: number
    }
}

export interface delete_dummy_function_return {
    code: number,
    message: string,
}

export interface delete_dummy_tests_interface {
    name: string,
    input: delete_dummy_function_params,
    check_output?: (input: delete_dummy_function_params, output: delete_dummy_function_return) => void
}