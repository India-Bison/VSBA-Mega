import { Error_Interface } from "@config/interfaces/error.interface";
import { get_course_list_function_params, get_course_list_function_return } from "./get-course-list.interface";
import { Transaction, Op } from "sequelize";
import { Grade } from "@src/models/grade.model";
import { Course } from "@src/models/course.model";
import { AcademicYear } from "@src/models/academic-year.model";

let get_course_list_function = async (data: get_course_list_function_params, transaction: Transaction): Promise<get_course_list_function_return | Error_Interface> => {
    try {
        let filter: any = { level: 0 };
        let pagination: any = {};
        let order: any = [["id", "ASC"]];

        if (data.page && data.page_size) {
            pagination = {
                offset: (data.page - 1) * data.page_size,
                limit: data.page_size,
            };
        }

        if (data.search) {
            filter.name = { [Op.iLike]: `%${data.search}%` };
        }

        if (data.sort) {
            order = data.sort.toLowerCase() === "ascending" ? [["name", "ASC"]] : [["name", "DESC"]];
        }

        if (data.grade_id) filter.grade_id = data.grade_id;
        if (data.subject_id) filter.subject_id = data.subject_id;
        if (data.id) filter.id = data.id;
        if (data.academic_year_id) filter.academic_year_id = data.academic_year_id;
        if (data.language) filter.language = data.language;

        if (data.user.role === "Project Head") {
        } else if (data.user.role === "Instructor") {
            filter.visibility = { [Op.contains]: ["instructors"] };
        } else if (data.user.role === "Student") {
            filter.visibility = { [Op.contains]: ["students"] };
        }

        let result: any = await Course.findAll({
            where: filter,
            include: [
                { model: Grade, attributes: ["id", "name", "number"] },
                { model: AcademicYear, attributes: ["id", "name"] },
            ],
            order, ...pagination, transaction
        });

        return {
            code: 200,
            message: "Courses Fetched Successfully",
            count: result.length,
            data: result.map((course: any) => ({
                id: course.id,
                name: course.name,
                language: course.language,
                course_code: course.course_code,
                hindi_course_status: course.hindi_course_status,
                marathi_course_status: course.marathi_course_status,
                english_course_status: course.english_course_status,
                grade_id: course.grade?.id || null,
                grade_name: course.grade?.name || null,
                academic_year_id: course['academic-year']?.id || null,
                academic_year_name: course['academic-year']?.name || null,
            })),
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};

export default get_course_list_function;
