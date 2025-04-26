import { Error_Interface } from "@config/interfaces/error.interface"
import { get_course_calendar_function_params, get_course_calendar_function_return } from "./get-course-calendar.interface"
import { Transaction } from "sequelize"
import { Calendar } from "@src/models/calendar.model";

let get_course_calendar_function = async (data: get_course_calendar_function_params, transaction: Transaction): Promise<get_course_calendar_function_return | Error_Interface> => {
    let filter: any = {};
    let order: any = [];
    const page = Number(data.page) > 0 ? Number(data.page) : 1;
    const page_size = Number(data.page_size) > 0 ? Number(data.page_size) : 10;
    const pagination = { offset: (page - 1) * page_size, limit: page_size };

    // if (data.instructor_id) filter.instructor_id = data.user.user_id;
    if (data.school_id) filter.school_id = data.school_id;
    if (data.academic_year_id) filter.academic_year_id = data.academic_year_id;
    if (data.course_id) filter.main_course_id = data.course_id;

    let query_options: any = {
        where: filter,
        order
    };

    let calendar = await Calendar.findAndCountAll({ ...query_options, transaction })

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
export default get_course_calendar_function