import { Error_Interface } from "@config/interfaces/error.interface"
import { update_dummy_function_params, update_dummy_function_return } from "./update-dummy.interface"
import { Transaction } from "sequelize"
import { dummy_service } from "../dummy.service"

let update_dummy_function = async (data: update_dummy_function_params, transaction: Transaction): Promise<update_dummy_function_return | Error_Interface> => {
    try {
        data.body.updated_by_id = data.user.id;
        const updated_dummy = await dummy_service.update_dummy(data.query.id, data.body, transaction);
        return {
            code: 200,
            message: 'Update Dummy Successful',
            data: updated_dummy
        }
    } catch (error) {
        throw error;
    }
}

export default update_dummy_function