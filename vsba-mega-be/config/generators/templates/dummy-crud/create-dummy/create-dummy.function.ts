import { Error_Interface } from "@config/interfaces/error.interface"
import { create_dummy_function_params, create_dummy_function_return } from "./create-dummy.interface"
import { Transaction } from "sequelize"
import { Dummy } from "../dummy.model"
import { dummy_service } from "../dummy.service"

let create_dummy_function = async (data: create_dummy_function_params, transaction: Transaction): Promise<create_dummy_function_return | Error_Interface> => {
    let body: any = { ...data }
    body.created_by_id = data.user?.id;
    body.updated_by_id = data.user?.id;
    let response = await dummy_service.create_dummy(body, transaction);
    return {
        code: 200,
        message: 'Create Dummy Successful',
        data: response
    }
}

export default create_dummy_function