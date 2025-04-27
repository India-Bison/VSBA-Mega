import { Error_Interface } from "@config/interfaces/error.interface";
import { get_dummy_list_function_params, get_dummy_list_function_return } from "./get-dummy-list.interface";
import { Op, Transaction } from "sequelize";
import { Dummy } from "../dummy.model";
import { dummy_service } from "../dummy.service";

let get_dummy_list_function = async (data: get_dummy_list_function_params, transaction: Transaction): Promise<get_dummy_list_function_return | Error_Interface> => {
    let filter = data.query
    const dummy_data = await dummy_service.get_all_dummy(filter, transaction);

    return {
        code: 200,
        message: 'Get Dummy List Successful',
        count: dummy_data.count,
        data: dummy_data.rows,
    };
};

export default get_dummy_list_function;
