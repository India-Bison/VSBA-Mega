import { Op, Transaction } from "sequelize";
import { Project } from "./project.model";
import { delete_from_cache, get_from_cache, set_cache } from "@config/cache.service";
import { SlotGroup } from "@src/models/slot-group.model";
import { Slot } from "@src/models/slot.model";

let has_cache = false;
let project_cache = {};
let list_cache = {};

let create_project = async (body: any, transaction: Transaction) => {
    const slot_data: any = body.slot_groups.map((slot: any) => ({
        slot_start_date: slot.slot_start_date || null,
        slot_end_date: slot.slot_end_date || null,
        start_time: slot.start_time || null,
        end_time: slot.end_time || null,
        hours: slot.hours || null,
        slot_times: slot.slot_times || null,
        project_id: null
    }));

    const create_slots = await SlotGroup.bulkCreate(slot_data, { transaction, returning: true });
    const slot_ids = create_slots.map((slot: any) => slot.id);

    const project_data: any = {
        name: body.name,
        full_venue_required: body.full_venue_required || null,
        resource_type: body.resource_type || [],
        description: body.description || null,
        audit_required: body.audit_required || null,
        project_start_date: body.project_start_date || null,
        project_end_date: body.project_end_date || null,
        week_days: body.week_days || [],
        slot_type: body.slot_type || null,
        type: body.type || null,
        status: body.status || "pending",
        parent_id: (body.type && body.type.toLowerCase() === "sub project") ? body.parent_id || null : null,
    }

    let project: any = await Project.create(project_data, { transaction, returning: true });

    if (project) {
        project = project.toJSON ? project.toJSON() : project;
    }

    if (slot_ids.length > 0) {
        await SlotGroup.update({ project_id: project.id }, { where: { id: slot_ids }, transaction });

        const project_slot_data = slot_ids.map((slot_ids: any) => ({ project_id: project.id, slot_group_id: slot_ids }))

        await Slot.bulkCreate(project_slot_data, { transaction })
    }

    set_cache(has_cache, project_cache, project.id, project);
    list_cache = {};

    return project;
};

let update_project = async (id: any, body: any, transaction: Transaction) => {
    const slot_data: any = body.slot_groups.map((slot: any) => ({
        slot_start_date: slot.slot_start_date || null,
        slot_end_date: slot.slot_end_date || null,
        start_time: slot.start_time || null,
        end_time: slot.end_time || null,
        hours: slot.hours || null,
        slot_times: slot.slot_times || null,
        project_id: null,
    }));

    const old_slot_groups = await SlotGroup.findAll({ where: { project_id: id }, transaction, });
    const old_slot_group_ids = old_slot_groups.map((slot: any) => slot.id);

    if (old_slot_group_ids.length > 0) {
        await Slot.destroy({ where: { slot_group_id: old_slot_group_ids }, transaction });
        await SlotGroup.destroy({ where: { id: old_slot_group_ids }, transaction });
    }

    const create_slots = await SlotGroup.bulkCreate(slot_data, { transaction, returning: true });
    const slot_ids = create_slots.map((slot: any) => slot.id);

    const project_data: any = {
        name: body.name,
        full_venue_required: body.full_venue_required || null,
        resource_type: body.resource_type || [],
        description: body.description || null,
        audit_required: body.audit_required || null,
        project_start_date: body.project_start_date || null,
        project_end_date: body.project_end_date || null,
        week_days: body.week_days || [],
        slot_type: body.slot_type || null,
        type: body.type || null,
        status: body.status || "pending",
        parent_id: (body.type && body.type.toLowerCase() === "sub project") ? body.parent_id || null : null,
    };

    const response = await Project.update(project_data, { where: { id }, limit: 1, returning: true, transaction });

    if (slot_ids.length > 0) {
        await SlotGroup.update({ project_id: id }, { where: { id: slot_ids }, transaction });

        const project_slot_data = slot_ids.map((slot_id: any) => ({ project_id: id, slot_group_id: slot_id }));

        await Slot.bulkCreate(project_slot_data, { transaction });
    }

    delete_from_cache(has_cache, project_cache, id);
    list_cache = {};

    return response[1]?.[0]?.toJSON();
};

let delete_project = async (id: any, transaction: Transaction) => {
    let response = await Project.destroy({ where: { id: id, test_data: { [Op.not]: true } }, transaction });
    delete_from_cache(has_cache, project_cache, id);
    list_cache = {}
    return response
}

let get_project = async (id: any, transaction: Transaction) => {
    try {
        let response = get_from_cache(has_cache, project_cache, id) || await Project.findOne({ where: { id: id }, include: [{ model: SlotGroup }], transaction });
        if (response) {
            response = response.toJSON ? response.toJSON() : response;

            if (response.type === "sub project" && response.parent_id) {
                const parent_project = await Project.findOne({ where: { id: response.parent_id }, include: [{ model: SlotGroup }], transaction })
                if (parent_project) {
                    response.parent_project = parent_project.toJSON ? parent_project.toJSON() : parent_project;
                }
            }
            set_cache(has_cache, project_cache, id, response);
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
        include: [{ model: SlotGroup }],
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
