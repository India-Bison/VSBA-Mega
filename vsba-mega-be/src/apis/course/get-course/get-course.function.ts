import { Error_Interface } from "@config/interfaces/error.interface";
import { get_course_function_params, get_course_function_return } from "./get-course.interface";
import { Transaction } from "sequelize";
import { Course } from "../../../models/course.model";
import { fetch_course_with_nested_data } from "../add-course/add-course.function";

let get_course_function = async (data: get_course_function_params, transaction: Transaction): Promise<get_course_function_return | Error_Interface> => {
    try {
        let filter: any = { where: {} };

        if (data.language) { filter.language = data.language }
        if (data.id) { filter.id = data.id }
        filter.transaction = transaction;

        let find_course = await Course.findOne(filter);

        if (!find_course) {
            return { code: 200, message: "No Record Found", data: [] };
        }

        let response;
        if (data.user?.role === "Project Head") {
            response = await fetch_course_with_nested_data(data.id, transaction);
        } else {
            response = await fetch_course_with_nested_data(data.id, transaction, data?.school_id, data?.user?.role);
        }

        return { code: 200, message: "Course Fetched Successfully", data: response };
    } catch (error) {
        console.error("Error in get_course_function:", error);
        throw error;
    }
};

export default get_course_function;
