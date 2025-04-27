import { Op, Transaction } from "sequelize";
import { Dummy } from "./dummy.model";

let has_cache = true;
let cache = {}

let create_dummy = async (body: any, transaction: Transaction) => {
    let response = await Dummy.create(body, { transaction });
    return response
}
let update_dummy = async (id: any, body: any, transaction: Transaction) => {
    let response = await Dummy.update(body, { where: { id }, limit: 1, returning: true, transaction });
    return response
}
let delete_dummy = async (id: any, transaction: Transaction) => {
    let response = await Dummy.destroy({ where: { id: id, test_data: { [Op.not]: true } }, transaction });
    return response
}
let get_dummy = async (id: any, transaction: Transaction) => {
    let response = await Dummy.findOne({ where: { id: id }, transaction });
    return response;
}
let get_all_dummy = async (filter: any, transaction: Transaction) => {
    let response = await Dummy.findAndCountAll({ where: { ...filter, test_data: { [Op.not]: true } }, transaction });
    return response;
}

export let dummy_service = {
    create_dummy,
    update_dummy,
    delete_dummy,
    get_dummy,
    get_all_dummy
}
// Compare this snippet from vsba-mega-be/config/generators/templates/dummy-crud/update-dummy/update-dummy.function.ts: