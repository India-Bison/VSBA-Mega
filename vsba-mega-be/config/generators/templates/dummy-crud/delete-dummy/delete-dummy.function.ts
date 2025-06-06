import { Error_Interface } from "@config/interfaces/error.interface"
import { delete_dummy_function_params, delete_dummy_function_return } from "./delete-dummy.interface"
import { Op, Transaction } from "sequelize"
import { Dummy } from "../dummy.model"
import { dummy_service } from "../dummy.service"

let delete_dummy_function = async (data: delete_dummy_function_params, transaction: Transaction): Promise<delete_dummy_function_return | Error_Interface> => {
    await dummy_service.delete_dummy(data.query.id, transaction)
    return {
        code: 200,
        message: 'Delete Dummy Successful'
    }
}

export default delete_dummy_function