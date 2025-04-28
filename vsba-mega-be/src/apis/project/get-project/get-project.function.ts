import { Error_Interface } from "@config/interfaces/error.interface"
import { get_project_function_params, get_project_function_return } from "./get-project.interface"
import { Transaction } from "sequelize"
import { project_service } from "../project.service"

let get_project_function = async (data: get_project_function_params, transaction: Transaction): Promise<get_project_function_return | Error_Interface> => {
    const project = await project_service.get_project(data.query.id, transaction)
    return {
        code: 200,
        message: 'Get Project Successful',
        data: project
    }
}

export default get_project_function