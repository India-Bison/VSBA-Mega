import { Error_Interface } from "@config/interfaces/error.interface"
import { update_dummy_function_params, update_dummy_function_return } from "./update-dummy.interface"
import { Transaction } from "sequelize"
import { Dummy } from "../dummy.model"

let update_dummy_function = async (data: update_dummy_function_params, transaction: Transaction): Promise<update_dummy_function_return | Error_Interface> => {
    data.updated_by_id = data.user.id;
    const updated_dummy = await Dummy.update(data, { where: { id: data.id }, limit: 1, returning: true, transaction })
    return {
        code: 200,
        message: 'Update Dummy Successful',
        data: updated_dummy[1]?.[0]?.toJSON()
    }
}

export default update_dummy_function