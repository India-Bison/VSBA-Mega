import { Error_Interface } from "@config/interfaces/error.interface"
import { update_dummy_function_params, update_dummy_function_return } from "./update-dummy.interface"
import { Transaction } from "sequelize"
import { Dummy } from "../dummy.model"

let update_dummy_function = async (data: update_dummy_function_params, transaction: Transaction): Promise<update_dummy_function_return | Error_Interface> => {
    const existring_dummy = await Dummy.findOne({ where: { id: data.id }, transaction });

    if (!existring_dummy) {
        return {
            code: 200,
            message: 'Data Not Found',
            data: []
        }
    }

    data.updated_by_id = data.user.user_id;
    const updated_dummy = await Dummy.update(data, { where: { id: data.id }, returning: true, transaction })

    return {
        code: 200,
        message: 'Update Dummy Successful',
        data: updated_dummy
    }
}

export default update_dummy_function