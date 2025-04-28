import { Error_Interface } from "@config/interfaces/error.interface";
import { get_project_list_function_params, get_project_list_function_return } from "./get-project-list.interface";
import { Transaction } from "sequelize";
import { project_service } from "../project.service";

let get_project_list_function = async (data: get_project_list_function_params, transaction: Transaction): Promise<get_project_list_function_return | Error_Interface> => {
    let filter = data.query

    const project_data = await project_service.get_all_project(filter, transaction);
    return {
        code: 200,
        message: 'Get Project List Successful',
        count: project_data.count,
        data: project_data.rows,
    };
};

export default get_project_list_function;
