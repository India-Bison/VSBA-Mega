export interface get_project_list_function_params {
    query?: {
        page?: number
        page_size?: number
    }
    body?: any
    user?: any
}

export interface get_project_list_function_return {
    code: number
    message: string
    data?: any
    count?: number
}

export interface get_project_list_tests_interface {
    name: string,
    input: get_project_list_function_params,
    check_output?: (input: get_project_list_function_params, output: get_project_list_function_return) => void
}