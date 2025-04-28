import { Error_Interface } from "@config/interfaces/error.interface"
import { update_project_function_params, update_project_function_return } from "./update-project.interface"
import { Transaction } from "sequelize"
import { project_service } from "../project.service"

let update_project_function = async (data: update_project_function_params, transaction: Transaction): Promise<update_project_function_return | Error_Interface> => {
    data.body.updated_by_id = data.user.id;
    const updated_project = await project_service.update_project(data.query.id, data.body, transaction);
    return {
        code: 200,
        message: 'Update Project Successful',
        data: updated_project
    }
}

export default update_project_function