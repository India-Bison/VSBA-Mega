import { Error_Interface } from "@config/interfaces/error.interface"
import { dummy_api_function_params, dummy_api_function_return } from "./dummy-api.interface"
import { Transaction } from "sequelize"

let dummy_api_function = async (data: dummy_api_function_params, transaction: Transaction): Promise<dummy_api_function_return | Error_Interface> => {
    return {
        code: 200,
        message: 'Dummy Api Successful'
    }
}

export default dummy_api_function