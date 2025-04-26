import { Error_Interface } from "@config/interfaces/error.interface";
import { get_dummy_list_function_params, get_dummy_list_function_return } from "./get-dummy-list.interface";
import { Op, Transaction } from "sequelize";
import { Dummy } from "../dummy.model";

let get_dummy_list_function = async (data: get_dummy_list_function_params, transaction: Transaction): Promise<get_dummy_list_function_return | Error_Interface> => {
    const dummy_data = await Dummy.findAndCountAll({
        where: {
            test_data: { [Op.not]: true }
        },
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
