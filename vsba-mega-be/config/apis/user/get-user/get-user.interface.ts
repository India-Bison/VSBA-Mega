export interface get_user_function_params {
    email_id: string
}

export interface get_user_function_return {
    code: number,
    message: string,
    data?:any
}

export interface get_user_tests_interface {
    name: string,
    input: get_user_function_params,
    check_output?: (input: get_user_function_params, output: get_user_function_return) => void
}