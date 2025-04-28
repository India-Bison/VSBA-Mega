import { Error_Interface } from "@config/interfaces/error.interface"
import { get_dummy_function_params, get_dummy_function_return } from "./get-dummy.interface"
import { Transaction } from "sequelize"
import { dummy_service } from "../dummy.service"

let get_dummy_function = async (data: get_dummy_function_params, transaction: Transaction): Promise<get_dummy_function_return | Error_Interface> => {
    const dummy = await dummy_service.get_dummy(data.query.id, transaction)
    return {
        code: 200,
        message: 'Get Dummy Successful',
        data: dummy
    }
}

export default get_dummy_function