import { Error_Interface } from "@config/interfaces/error.interface";
import { delete_course_function_params, delete_course_function_return } from "./delete-course.interface";
import { Transaction } from "sequelize";
import { Course } from "../../../models/course.model";
import { StudyMaterial } from "@src/models/study-material.model";
import { Assessment } from "@src/models/assessment.model";
import { Calendar } from "@src/models/calendar.model";
import { StudentAssessment } from "@src/models/student-assessment.model";

let delete_course_function = async (data: delete_course_function_params, transaction: Transaction): Promise<delete_course_function_return | Error_Interface> => {
    if (!data.id) {
        return { code: 400, message: "Course ID is required!" };
    }

    let existing_course: any = await Course.findOne({ where: { id: data.id }, transaction });
    if (!existing_course) {
        return { code: 200, message: `Course with ID = ${data.id} not found!` };
    }

    const delete_child_courses = async (parent_id: number) => {
        let child_courses: any = await Course.findAll({ where: { parent_id: parent_id }, transaction });

        for (let child of child_courses) {
            await delete_child_courses(child.id);

            if (child.assessment_id) {
                await StudentAssessment.destroy({ where: { assessment_id: child.assessment_id }, transaction });
            }
            await Course.update({ assessment_id: null }, { where: { assessment_id: child.assessment_id }, transaction });

            await StudyMaterial.destroy({ where: { course_id: child.id }, transaction });
            await Assessment.destroy({ where: { course_id: child.id }, transaction });
            await Calendar.destroy({ where: { course_id: child.id }, transaction });
            await Course.destroy({ where: { id: child.id }, transaction });
        }
    };
    await delete_child_courses(data.id);

    if (existing_course.assessment_id) {
        await StudentAssessment.destroy({ where: { assessment_id: existing_course.assessment_id }, transaction });
    }
    await Course.update({ assessment_id: null }, { where: { assessment_id: existing_course.assessment_id }, transaction });

    await StudyMaterial.destroy({ where: { course_id: data.id }, transaction });
    await Assessment.destroy({ where: { course_id: data.id }, transaction });
    await Calendar.destroy({ where: { course_id: data.id }, transaction });
    await Course.destroy({ where: { id: data.id }, transaction });

    return { code: 200, message: "Course deleted successfully" };
};

export default delete_course_function;