import { Op, Transaction } from "sequelize";
import { Dummy } from "./dummy.model";
import { delete_from_cache, get_from_cache, set_cache } from "@config/cache.service";

let has_cache = true;
let dummy_cache = {};
let list_cache = {};

let create_dummy = async (body: any, transaction: Transaction) => {
    let response: any = await Dummy.create(body, { transaction, returning: true });
    if (response) {
        response = response.toJSON ? response.toJSON() : response;
    }
    set_cache(has_cache, dummy_cache, response.id, response);
    list_cache = {}
    return response
}
let update_dummy = async (id: any, body: any, transaction: Transaction) => {
    let response = await Dummy.update(body, { where: { id }, limit: 1, returning: true, transaction });
    delete_from_cache(has_cache, dummy_cache, id);
    list_cache = {}
    return response[1]?.[0]?.toJSON()
}
let delete_dummy = async (id: any, transaction: Transaction) => {
    let response = await Dummy.destroy({ where: { id: id, test_data: { [Op.not]: true } }, transaction });
    delete_from_cache(has_cache, dummy_cache, id);
    list_cache = {}
    return response
}
let get_dummy = async (id: any, transaction: Transaction) => {
    let response = get_from_cache(has_cache, dummy_cache, id) || await Dummy.findOne({ where: { id: id }, transaction });
    if (response) {
        response = response.toJSON ? response.toJSON() : response;
    }
    set_cache(has_cache, dummy_cache, id, response);
    return response;
}
let get_all_dummy = async (filter: any, transaction: Transaction) => {
    let response = get_from_cache(has_cache, list_cache, filter) || await Dummy.findAndCountAll({ where: { ...filter, test_data: { [Op.not]: true } }, transaction });
    if (response) {
        response = {
            count: response.count,
            rows: response.rows.map((item: any) => {
                return item.toJSON ? item.toJSON() : item;
            })
        }
    }
    set_cache(has_cache, list_cache, filter, response);
    return response;
}

export let dummy_service = {
    create_dummy,
    update_dummy,
    delete_dummy,
    get_dummy,
    get_all_dummy
}
