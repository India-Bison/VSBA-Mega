import { Error_Interface } from "@config/interfaces/error.interface";
import { get_dummy_list_function_params, get_dummy_list_function_return } from "./get-dummy-list.interface";
import { Transaction } from "sequelize";
import { Dummy } from "../dummy.model";
import { User } from "@config/models/user.model";

let get_dummy_list_function = async (data: get_dummy_list_function_params, transaction: Transaction): Promise<get_dummy_list_function_return | Error_Interface> => {
    const dummy_data = await Dummy.findAndCountAll({
        include: [
            { model: User, as: 'created_by_user', attributes: ['id', 'first_name'] },
            { model: User, as: 'updated_by_user', attributes: ['id', 'first_name'] },
        ],
        transaction
    });

    const formatted_list = dummy_data.rows.map((record: any) => {
        return {
            id: record.id,
            first_name: record.first_name,
            last_name: record.last_name,
            created_by_name: record.created_by_user?.first_name || null,
            updated_by_name: record.updated_by_user?.first_name || null,
        };
    });

    return {
        code: 200,
        message: 'Get Dummy List Successful',
        count: dummy_data.count,
        data: formatted_list
    };
};

export default get_dummy_list_function;
