import { Error_Interface } from "@config/interfaces/error.interface"
import { create_dummy_function_params, create_dummy_function_return } from "./create-dummy.interface"
import { Transaction } from "sequelize"
import { Dummy } from "../dummy.model"

let create_dummy_function = async (data: create_dummy_function_params, transaction: Transaction): Promise<create_dummy_function_return | Error_Interface> => {
    let body: any = { ...data }
    console.log(data.user)
    body.created_by_id = data.user?.id;
    body.updated_by_id = data.user?.id;
    let response = await Dummy.create(body, { transaction });
    return {
        code: 200,
        message: 'Create Dummy Successful',
        data: response
    }
}

export default create_dummy_function