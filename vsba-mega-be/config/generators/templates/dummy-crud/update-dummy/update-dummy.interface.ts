export interface update_dummy_function_params {
    id: number
    first_name?: string
    last_name?: string
    user?: any
    updated_by_id?: any
}

export interface update_dummy_function_return {
    code: number,
    message: string,
    data?: any
}

export interface update_dummy_tests_interface {
    name: string,
    input: update_dummy_function_params,
    check_output?: (input: update_dummy_function_params, output: update_dummy_function_return) => void
}