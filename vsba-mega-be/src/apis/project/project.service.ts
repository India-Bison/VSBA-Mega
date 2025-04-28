import { Op, Transaction } from "sequelize";
import { Project } from "./project.model";
import { delete_from_cache, get_from_cache, set_cache } from "@config/cache.service";
import { SlotGroup } from "@src/models/slot-group.model";
import { Slot } from "@src/models/slot.model";

let has_cache = false;
let project_cache = {};
let list_cache = {};

let create_project = async (body: any, transaction: Transaction) => {
    const slot_data = body.slot_groups.map((slot: any) => ({
        slot_start_date: slot.slot_start_date,
        slot_end_date: slot.slot_end_date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        hours: slot.hours,
        slot_times: slot.slot_times,
        project_id: null
    }));

    const create_slots = await SlotGroup.bulkCreate(slot_data, { transaction, returning: true });
    const slot_ids = create_slots.map((slot: any) => slot.id);

    const project_data = {
        name: body.name,
        full_venue_required: body.full_venue_required,
        resource_type: body.resource_type,
        description: body.description,
        audit_required: body.audit_required,
        project_start_date: body.project_start_date,
        project_end_date: body.project_end_date,
        week_days: body.week_days,
        slot_type: body.slot_type,
        type: body.type,
        status: body.status,
        parent_id: body.parent_id,
    }

    let project: any = await Project.create(project_data, { transaction, returning: true });

    if (project) {
        project = project.toJSON ? project.toJSON() : project;
    }

    if (slot_ids.length > 0) {
        await SlotGroup.update({ project_id: project.id }, { where: { id: slot_ids }, transaction });

        const project_slot_data = slot_ids.map((slot_ids: any) => ({
            project_id: project.id,
            slot_group_id: slot_ids
        }))

        await Slot.bulkCreate(project_slot_data, { transaction })
    }

    set_cache(has_cache, project_cache, project.id, project);
    list_cache = {};

    return project;
};

let update_project = async (id: any, body: any, transaction: Transaction) => {
    let response = await Project.update(body, { where: { id }, limit: 1, returning: true, transaction });
    delete_from_cache(has_cache, project_cache, id);
    list_cache = {}
    return response[1]?.[0]?.toJSON()
}

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

let get_all_project = async (filter: any, transaction: Transaction) => {
    let response = get_from_cache(has_cache, list_cache, filter) || await Project.findAndCountAll({ where: { ...filter, test_data: { [Op.not]: true } }, transaction });
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

export let project_service = {
    create_project,
    update_project,
    delete_project,
    get_project,
    get_all_project
}
