export interface get_project_function_params {
    query: {
        id: number
    },
    user?: any
}

export interface get_project_function_return {
    code: number,
    message: string,
    data?: any
}

export interface get_project_tests_interface {
    name: string,
    input: get_project_function_params,
    check_output?: (input: get_project_function_params, output: get_project_function_return) => void
}