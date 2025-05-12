import { Error_Interface } from "@config/interfaces/error.interface"
import { delete_project_function_params, delete_project_function_return } from "./delete-project.interface"
import { Transaction } from "sequelize"
import { project_service } from "../project.service"

let delete_project_function = async (data: delete_project_function_params, transaction: Transaction): Promise<delete_project_function_return | Error_Interface> => {
    const ids = Array.isArray(data.query.id) ? data.query.id : [data.query.id];
    await project_service.delete_project(ids, transaction)
    return {
        code: 200,
        message: 'Delete Project Successful'
    }
}

export default delete_project_function