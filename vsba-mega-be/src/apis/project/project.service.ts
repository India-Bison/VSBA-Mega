import { Op, Transaction } from "sequelize";
import { Project } from "./project.model";
import { delete_from_cache, get_from_cache, set_cache } from "@config/cache.service";
import { SlotGroup } from "@src/models/slot-group.model";
const { v4: uuidv4 } = require('uuid');

let has_cache = false;
let project_cache = {};
let list_cache = {};

let create_project = async (body: any, transaction: Transaction) => {
    const random_suffix = uuidv4().split('-')[0];
    const date_part = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    body.project_code = `PRJ-${date_part}-${random_suffix}`;

    if (body.status === "Draft") {
        body.draft_json = structuredClone(body);
        body.status = "Draft";
    }

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
        if (body.status === "Draft") {
            body.draft_json = body;
            body.status = "Draft";
        }
        if (body.slot_groups) {
            await SlotGroup.destroy({ where: { project_id: id }, transaction });
            body.slot_groups.forEach((slot: any) => slot.project_id = id);
            await SlotGroup.bulkCreate(body.slot_groups, { transaction, returning: true });
        }
        const response = await Project.update(body, { where: { id }, limit: 1, returning: true, transaction });

        delete_from_cache(has_cache, project_cache, id);
        list_cache = {};

        return response[1]?.[0]?.toJSON();
    } catch (error) {
        console.log(error)
        throw error;
    }
};

let delete_project = async (ids: any, transaction: Transaction) => {
    let response = await Project.destroy({ where: { id: { [Op.in]: ids }, test_data: { [Op.not]: true } }, transaction });

    ids.forEach((id: any) => delete_from_cache(has_cache, project_cache, id));
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
    const order: any[] = [];

    const page = Number(data.page) > 0 ? Number(data.page) : 1;
    const pageSize = Number(data.page_size) > 0 ? Number(data.page_size) : 10;
    const offset = (page - 1) * pageSize;

    const { page: _, page_size: __, search, sort_by = 'id', sort_order = 'desc', status, ...otherFilters } = data;

    const cached = get_from_cache(has_cache, list_cache, data);
    if (cached) return cached;

    const filter: any = {
        ...otherFilters,
        test_data: { [Op.not]: true },
    };

    if (search) {
        filter[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { short_name: { [Op.iLike]: `%${search}%` } },
        ];
    }

    const sorting_fields = ['name', 'short_name', 'project_start_date', 'project_end_date', 'resource_type', 'slot_type'];
    if (sort_by && sorting_fields.includes(sort_by)) {
        order.push([sort_by, sort_order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
    } else {
        order.push(['id', 'DESC']);
    }

    if (status && status.toLowerCase() !== "all") filter.status = status;

    const all_projects: any = await Project.findAll({ where: filter, include: [{ model: SlotGroup }], order, transaction });

    const parents: any[] = [];
    const children: Record<number, any[]> = {};

    for (const proj of all_projects) {
        if (proj.parent_id || proj.type === 'Sub-Project') {
            const pid = proj.parent_id;
            if (!children[pid]) children[pid] = [];
            children[pid].push(proj);
        } else {
            parents.push({ ...proj.toJSON(), children: [] });
        }
    }

    for (const parent of parents) {
        parent.children = children[parent.id] || [];
    }

    const paginated = parents.slice(offset, offset + pageSize);

    const result = { count: parents.length, rows: paginated };
    set_cache(has_cache, list_cache, data, result);
    return result;
};

export let project_service = {
    create_project,
    update_project,
    delete_project,
    get_project,
    get_all_project
}
