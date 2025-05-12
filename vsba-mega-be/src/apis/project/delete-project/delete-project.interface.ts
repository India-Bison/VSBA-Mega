export interface delete_project_function_params {
    query: {
        id: any
    }
}

export interface delete_project_function_return {
    code: number,
    message: string,
}

export interface delete_project_tests_interface {
    name: string,
    input: delete_project_function_params,
    check_output?: (input: delete_project_function_params, output: delete_project_function_return) => void
}