import { Error_Interface } from "@config/interfaces/error.interface"
import { get_user_function_params, get_user_function_return } from "./get-user.interface"
import { Transaction } from "sequelize"
import { User } from "@config/models/user.model"

let get_user_function = async (data: get_user_function_params, transaction: Transaction): Promise<get_user_function_return | Error_Interface> => {

    let user = await User.findOne({
        where: { email_id: data.email_id },
        attributes: ['keyclock_user_id', 'keycloak_user_name', 'role'],
        include: [], transaction
    })
    if (!user) {
        return {
            code: 200,
            message: `User with Email ${data.email_id} not found!`
        }
    }
    return {
        code: 200,
        message: 'User fetched Successfully',
        data: user
    }
}

export default get_user_function