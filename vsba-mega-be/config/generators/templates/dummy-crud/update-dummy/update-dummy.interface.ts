export interface update_dummy_function_params {
    query: {
        id: number
    },
    body: {
        first_name?: string
        last_name?: string
        updated_by_id?: number
    }
    user?: any
}

export interface update_dummy_function_return {
    code: number
    message: string
    data?: any
}

export interface update_dummy_tests_interface {
    name: string,
    input: update_dummy_function_params,
    check_output?: (input: update_dummy_function_params, output: update_dummy_function_return) => void
}