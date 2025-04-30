import { Op, Transaction } from "sequelize";
import { Project } from "./project.model";
import { delete_from_cache, get_from_cache, set_cache } from "@config/cache.service";
import { SlotGroup } from "@src/models/slot-group.model";

let has_cache = false;
let project_cache = {};
let list_cache = {};

let create_project = async (body: any, transaction: Transaction) => {
    let project: any = await Project.create(body, { transaction, returning: true });

    if (project) project = project.toJSON ? project.toJSON() : project;

    body.slot_groups.forEach((slot: any) => { slot.project_id = project.id })

    await SlotGroup.bulkCreate(body.slot_groups, { transaction, returning: true });

    set_cache(has_cache, project_cache, project.id, project);
    list_cache = {};

    return project;
};

let update_project = async (id: any, body: any, transaction: Transaction) => {
    try {
        // const old_slot_groups = await SlotGroup.destroy({ where: { project_id: id }, transaction, });
        body.slot_groups.forEach((slot: any) => slot.project_id = id);
        await SlotGroup.bulkCreate(body.slot_groups, { transaction, returning: true });

        const response = await Project.update(body, { where: { id }, limit: 1, returning: true, transaction });

        delete_from_cache(has_cache, project_cache, id);
        list_cache = {};

        return response[1]?.[0]?.toJSON();
    } catch (error) {
        console.log(error)
        throw error;
    }

};

let delete_project = async (id: any, transaction: Transaction) => {
    let response = await Project.destroy({ where: { id: id, test_data: { [Op.not]: true } }, transaction });
    delete_from_cache(has_cache, project_cache, id);
    list_cache = {}
    return response
}

let get_project = async (id: any, transaction: Transaction) => {
    try {
        let response = get_from_cache(has_cache, project_cache, id) || await Project.findOne({ where: { id: id }, include: [{ model: SlotGroup }, { model: Project, as: 'children' }], transaction });
        if (response) {
            response = response.toJSON ? response.toJSON() : response;
            set_cache(has_cache, project_cache, id, response);
            return response
        } else {
            console.log(`Project with id ${id} not found in database.`);
        }
        return response;
    } catch (error) {
        console.error(`Error fetching project with id ${id}:`, error);
        throw error;
    }
}

let get_all_project = async (data: any, transaction: Transaction) => {
    const page = Number(data.page) > 0 ? Number(data.page) : 1;
    const page_size = Number(data.page_size) > 0 ? Number(data.page_size) : 10;
    const pagination = { offset: (page - 1) * page_size, limit: page_size };

    let where_filter = { ...data };
    delete where_filter.page;
    delete where_filter.page_size;

    let response = get_from_cache(has_cache, list_cache, data) || await Project.findAndCountAll({
        where: { ...where_filter, test_data: { [Op.not]: true } },
        include: [{ model: SlotGroup }, { model: Project, as: 'children' }],
        ...pagination,
        transaction
    });

    if (response) {
        response = {
            count: response.count,
            rows: await Promise.all(response.rows.map(async (item: any) => {
                let project = item.toJSON ? item.toJSON() : item;

                if (project.type === "sub project" && project.parent_id) {
                    const parent_project = await Project.findOne({ where: { id: project.parent_id }, include: [{ model: SlotGroup }], transaction });

                    if (parent_project) {
                        project.parent_project = parent_project.toJSON ? parent_project.toJSON() : parent_project;
                    }
                }
                return project;
            }))
        };
    }

    set_cache(has_cache, list_cache, data, response);
    return response;
}

export let project_service = {
    create_project,
    update_project,
    delete_project,
    get_project,
    get_all_project
}
