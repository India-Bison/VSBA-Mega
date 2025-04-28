export interface update_project_function_params {
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

export interface update_project_function_return {
    code: number
    message: string
    data?: any
}

export interface update_project_tests_interface {
    name: string,
    input: update_project_function_params,
    check_output?: (input: update_project_function_params, output: update_project_function_return) => void
}