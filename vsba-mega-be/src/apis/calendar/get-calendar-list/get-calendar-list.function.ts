import { Error_Interface } from "@config/interfaces/error.interface"
import { get_calendar_list_function_params, get_calendar_list_function_return } from "./get-calendar-list.interface"
import { Transaction } from "sequelize"
import { Calendar } from "@src/models/calendar.model";
import { Course } from "@src/models/course.model";
import { Grade } from "@src/models/grade.model";

let get_calendar_list_function = async (data: get_calendar_list_function_params, transaction: Transaction): Promise<get_calendar_list_function_return | Error_Interface> => {
    let filter: any = {};
    // if (data.instructor_id) filter.instructor_id = data.user?.user_id;
    if (data.school_id) filter.school_id = data.school_id;
    if (data.academic_year_id) filter.academic_year_id = data.academic_year_id;
    if (data.course_id) filter.main_course_id = data.course_id;
    if (data.grade_id) filter['$course.grade.id$'] = data.grade_id;

    let query_options: any = {
        where: filter,
    };

    let calendar = await Calendar.findAndCountAll({
        ...query_options,
        include: [
            { model: Course, include: [{ model: Grade, attributes: ['id', 'name'] }], attributes: [] },
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
        message: 'Calendar Fetched Successfully',
        count: calendar.count,
        data: calendar.rows
    }
}

export default get_calendar_list_function