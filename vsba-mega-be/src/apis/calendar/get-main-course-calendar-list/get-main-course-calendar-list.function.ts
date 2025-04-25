import { Error_Interface } from "@config/interfaces/error.interface"
import { get_main_course_calendar_list_function_params, get_main_course_calendar_list_function_return } from "./get-main-course-calendar-list.interface"
import { Op, Transaction } from "sequelize"
import { Calendar } from "@src/models/calendar.model";
import { Course } from "@src/models/course.model";
import { School } from "@src/models/school.model";
import { Grade } from "@src/models/grade.model";
import { AcademicYear } from "@src/models/academic-year.model";

let get_main_course_calendar_list_function = async (data: get_main_course_calendar_list_function_params, transaction: Transaction): Promise<get_main_course_calendar_list_function_return | Error_Interface> => {
    let filter: any = {};
    let order: any = [];
    const page = Number(data.page) > 0 ? Number(data.page) : 1;
    const page_size = Number(data.page_size) > 0 ? Number(data.page_size) : 10;
    const pagination = { offset: (page - 1) * page_size, limit: page_size };

    const sort_fields = ['name'];
    if (data.sort_by && sort_fields.includes(data.sort_by)) {
        order.push([data.sort_by, data.sort_order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);
    }

    if (data?.search) {
        filter[Op.or] = [
            { name: { [Op.iLike]: `%${data.search}%` } }
        ];
    }

    if (data?.main_course_ids) filter.course_id = { [Op.in]: data.main_course_ids };
    if (data?.school_id) { filter["$calendar.school_id$"] = data.school_id }
    if (data?.academic_year_id) { filter["$calendar.academic_year_id$"] = data.academic_year_id }

    let query_options: any = {
        where: filter,
        order, ...pagination
    };

    let calendar = await Calendar.findAndCountAll({
        ...query_options,
        include: [
            {
                model: Course, include: [
                    { model: Grade, attributes: ['id', 'name'] },
                    { model: AcademicYear, attributes: ['id', 'name'] }
                ], attributes: ['id', 'name'], as: 'course'
            },
            { model: School, attributes: ['id', 'name'] }
        ],
        transaction
    })

    if (calendar.count == 0) {
        return {
            code: 200,
            message: 'No Calendar Found!',
            count: calendar.count,
            data: calendar.rows
        }
    }
    return {
        code: 200,
        message: 'Calenar Fetched Successfully',
        count: calendar.count,
        data: calendar.rows
    }
}

export default get_main_course_calendar_list_function