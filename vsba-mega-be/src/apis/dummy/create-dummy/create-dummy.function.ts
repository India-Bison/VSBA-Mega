import { Error_Interface } from "@config/interfaces/error.interface"
import { create_dummy_function_params, create_dummy_function_return } from "./create-dummy.interface"
import { Transaction } from "sequelize"

let create_dummy_function = async (data: create_dummy_function_params, transaction: Transaction): Promise<create_dummy_function_return | Error_Interface> => {
    return {
        code: 200,
        message: 'Create Dummy Successful'
    }
}

export default create_dummy_function