import { Error_Interface } from "@config/interfaces/error.interface"
import { create_project_function_params, create_project_function_return } from "./create-project.interface"
import { Transaction } from "sequelize"
import { project_service } from "../project.service"

let create_project_function = async (data: create_project_function_params, transaction: Transaction): Promise<create_project_function_return | Error_Interface> => {
    try {
        let body: any = { ...data.body }
        body.created_by_id = data.user.id;
        let response = await project_service.create_project(body, transaction);

        return { code: 200, message: 'Create Project Successful', data: response }
    } catch (error: any) {
        console.log(error.message);
        throw error.message;
    }
}

export default create_project_function