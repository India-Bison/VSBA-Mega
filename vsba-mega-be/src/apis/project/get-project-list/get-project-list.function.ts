import { Error_Interface } from "@config/interfaces/error.interface";
import { get_project_list_function_params, get_project_list_function_return } from "./get-project-list.interface";
import { Transaction } from "sequelize";
import { project_service } from "../project.service";

let get_project_list_function = async (data: get_project_list_function_params, transaction: Transaction): Promise<get_project_list_function_return | Error_Interface> => {
    try {
        const filter = data.query;
        const project_data = await project_service.get_all_project(filter, transaction);

        return {
            code: 200,
            message: "Get Project List Successful",
            count: project_data.count,
            data: project_data.rows,
        };
    } catch (error: any) {
        console.log(error);
        
        return {
            code: 500,
            message: "Failed to fetch project list",
            error: error.message || "Unknown error",
        };
    }
};

export default get_project_list_function;
