import { Error_Interface } from "@config/interfaces/error.interface";
import { get_dummy_list_function_params, get_dummy_list_function_return } from "./get-dummy-list.interface";
import { Transaction } from "sequelize";
import { Dummy } from "../dummy.model";
import { User } from "@config/models/user.model";

let get_dummy_list_function = async (data: get_dummy_list_function_params, transaction: Transaction): Promise<get_dummy_list_function_return | Error_Interface> => {
    const dummy_data = await Dummy.findAndCountAll({
        transaction
    });

    return {
        code: 200,
        message: 'Get Dummy List Successful',
        count: dummy_data.count,
        data: dummy_data.rows.map((dummy: any) => dummy.toJSON()),
    };
};

export default get_dummy_list_function;
