import { Error_Interface } from "@config/interfaces/error.interface"
import { update_course_function_params, update_course_function_return } from "./update-course.interface"
import { Transaction } from "sequelize"
import { Course } from "@src/models/course.model";
import { StudyMaterial } from "@src/models/study-material.model";
import { Assessment } from "@src/models/assessment.model";

let update_course_function = async (data: update_course_function_params, transaction: Transaction): Promise<update_course_function_return | Error_Interface> => {
    try {
        let updated_course = await update_course(data, transaction, 0, null, null, data.user);
        return { code: 200, message: "Course Updated Successfully", data: updated_course }
    } catch (error) {
        console.error("Error updating course:", error);
        throw error
    }
}

async function update_course(course: any, transaction: Transaction, level = 0, main_parent_id: any, parent_id: any, user: any) {
    try {
        if (!course.status == null || course.status === "No Change") return;

        course.level = level;
        course.levels = course.levels || [];
        let levels = [...course.levels];
        delete course.levels;

        course.total_marks = course.total_marks ? parseInt(course.total_marks) : null;
        course.academic_year_id = course.academic_year_id ? parseInt(course.academic_year_id) : null;
        course.assessment_id = course.assessment_id ? parseInt(course.assessment_id) : null;
        course.assessment_type_id = course.assessment_type_id ? parseInt(course.assessment_type_id) : null;

        let existing_course: any = await Course.findByPk(course.id, { transaction });
        if (existing_course) {
            if (course.course_status === "Updated") {
                await Course.update(course, { where: { id: course.id }, transaction });
            } else if (course.is_deleted == true) {
                await Course.update({ is_deleted: true }, { where: { id: course.id }, transaction });
                return;
            }
        } else if (course.course_status === "New") {
            existing_course = await Course.create(course, { transaction });
        }

        if (existing_course) {
            await update_materials(existing_course, Array.isArray(course.materials) ? course.materials : [], transaction, user);

            // let assessment_data = { assessment_type_id: course.assessment_type_id, total_marks: course.total_marks, due_date: course.due_date, description: course.assessment_description, course_id: existing_course.id, assessment_status: false };
            // await update_assessments(existing_course, assessment_data, transaction, user);
        }

        level++;
        for (let sub_course of levels) {
            sub_course.parent_id = existing_course?.id;
            sub_course.main_parent_id = main_parent_id || existing_course?.id;
            await update_course(sub_course, transaction, level, main_parent_id || existing_course?.id, existing_course?.id, user);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function update_materials(course: any, materials: any[], transaction: Transaction, user: any) {
    try {
        if (!materials || !Array.isArray(materials)) return;

        for (let material of materials) {
            if (!material.status == null || material.status === "No Change") continue;
            material.course_id = course.id;

            if (Array.isArray(material.topic_content)) {
                material.topic_content = JSON.stringify(material.topic_content);
            }

            if (material.status === 'Updated') {
                await StudyMaterial.update(material, { where: { id: material.id }, transaction })
            } else if (material.is_deleted == true) {
                await StudyMaterial.update({ is_deleted: true }, { where: { id: material.id }, transaction })
            } else if (material.status === 'New' && !material.id) {
                const newMaterial = { ...material };
                delete newMaterial.status;
                
                await StudyMaterial.create(material, { transaction })
            }
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function update_assessments(course: any, assessment_data: any, transaction: Transaction, user: any) {
    try {
        let existing_assessment: any = await Assessment.findOne({ where: { course_id: course.id }, transaction });

        if (existing_assessment) {
            if (course.is_deleted) {
                await existing_assessment.update({ is_deleted: true }, { transaction });
            } else if (assessment_data.assessment_status === "Updated") {
                await existing_assessment.update(assessment_data, { transaction });
                console.log(`Assessment ID ${existing_assessment.id} updated.`);
            }
        } else if (assessment_data.assessment_status === "New") {
            let new_assessment_data = {
                ...assessment_data,
                instructor_id: user?.id || null,
                grade_id: course.grade_id || null,
                school_id: course.school_id || null,
                academic_year_id: course.academic_year_id || null,
                main_course_id: course.main_parent_id || null,
                sub_course_id: course.parent_id || null,
                is_deleted: false,
            };

            await Assessment.create(new_assessment_data, { transaction });
        }
    } catch (error) {
        throw error;
    }
}

export default update_course_function