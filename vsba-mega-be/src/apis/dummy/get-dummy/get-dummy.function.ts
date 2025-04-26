import { Error_Interface } from "@config/interfaces/error.interface"
import { get_dummy_function_params, get_dummy_function_return } from "./get-dummy.interface"
import { Transaction } from "sequelize"
import { Dummy } from "../dummy.model"
import { User } from "@config/models/user.model"

let get_dummy_function = async (data: get_dummy_function_params, transaction: Transaction): Promise<get_dummy_function_return | Error_Interface> => {
    const dummy = await Dummy.findOne({
        where: { id: data.id },
        include: [
            { model: User, as: 'created_by_user', attributes: ['id', 'first_name'] },
            { model: User, as: 'updated_by_user', attributes: ['id', 'first_name'] },
        ],
        transaction
    });

    if (!dummy) {
        return {
            code: 200,
            message: 'Data Not Found',
            data: []
        }
    }

    return {
        code: 200,
        message: 'Get Dummy Successful',
        data: dummy
    }
}

export default get_dummy_function