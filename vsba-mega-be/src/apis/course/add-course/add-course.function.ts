import { Error_Interface } from "@config/interfaces/error.interface";
import { add_course_function_params, add_course_function_return } from "./add-course.interface";
import { Op, Transaction } from "sequelize";
import { Course } from "../../../models/course.model";
import { StudyMaterial } from "@src/models/study-material.model";
import { File } from "@src/models/file.model";
import { Calendar } from "@src/models/calendar.model";
import { AssessmentType } from "@src/models/assessment-type.model";
import { AcademicYear } from "@src/models/academic-year.model";
import { School } from "@src/models/school.model";
import { Grade } from "@src/models/grade.model";
import { Subject } from "@src/models/subject.model";

const add_course_function = async (data: add_course_function_params, transaction: Transaction): Promise<add_course_function_return | Error_Interface> => {
    try {
        let course = await add_course(data, transaction, 0, null, null, data.user);
        return { code: 200, message: "Course Added Successfully!", data: course, };
    } catch (error) {
        console.log(error)
        throw error
    }
};

async function add_course(course: any, transaction: any, level = 0, main_parent_id: any, parent_id: any, user: any) {
    try {
        course.level = level;
        course.levels = course.levels || [];
        course.language = course.language || [];
        course.visibility = course.visibility || [];
        course.course_content = course.course_content || [];

        let levels = [...course.levels];
        delete course.levels;

        let new_course: any = await Course.create(course, { transaction });

        await add_materials(new_course, course.materials, transaction, user);

        level++;
        for (let sub_course of levels) {
            sub_course.parent_id = new_course.id;
            sub_course.main_parent_id = main_parent_id || new_course.id;

            sub_course.total_marks = sub_course.total_marks || course.total_marks;
            sub_course.assessment_type_id = sub_course.assessment_type_id || course.assessment_type_id;
            sub_course.due_date = sub_course.due_date || course.due_date;
            sub_course.assessment_description = sub_course.assessment_description || course.assessment_description;

            await add_course(sub_course, transaction, level, main_parent_id || new_course.id, new_course.id, user);
        }
    } catch (error) {
        throw error;
    }
}

async function add_materials(course: any, materials: any[], transaction: any, user: any) {
    try {
        if (materials?.length) {
            materials.forEach((material) => { material.course_id = course.id });

            let added_study_materials: any[] = await StudyMaterial.bulkCreate(materials, { transaction });

            for (let i = 0; i < added_study_materials.length; i++) {
                const material = materials[i];
                if (material.value) {
                    await link_file("study_material_id", added_study_materials[i].id, material.purpose, material.value, transaction);
                }
            }
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function fetch_course_with_nested_data(course_id: any, transaction: any, school_id?: number, user_role?: string) {
    let filter: any = {};
    course_id = parseInt(course_id);

    if (user_role === "Project Head") {
    } else if (user_role === "Instructor") {
        filter[Op.or] = [
            { visibility: { [Op.contains]: ["instructors"] } },
            { visibility: { [Op.eq]: [] } },
        ];
    } else if (user_role === "Student") {
        filter[Op.or] = [
            { visibility: { [Op.contains]: ["students"] } },
            { visibility: { [Op.eq]: [] } },
        ];
    }

    const { Assessment } = require("@src/models/assessment.model");

    const course_include: any[] = [
        { model: StudyMaterial, as: 'materials' },
        {
            model: Assessment, as: 'assessments',
            include: [
                { model: Calendar, attributes: ['total_student_count', 'total_uploaded_test_paper_count'], as: 'assessment_details' },
                { model: AssessmentType, attributes: ['id', 'name'], as: 'assessment_type' },
                { model: Grade, attributes: ['id', 'name'] },
                { model: Course, attributes: ['id', 'name'] },
                { model: School, attributes: ['id', 'name'] },
                { model: AcademicYear, attributes: ['id', 'name'], as: 'academic_year' },
            ]
        },
        { model: Subject, attributes: ['id', 'name'] },
    ];

    if (school_id) { course_include.push({ model: Calendar, where: { school_id }, attributes: ['progress', 'total_uploaded_test_paper_count', 'total_student_count'], required: false }) }

    let course: any = await Course.findOne({ where: { ...filter, id: course_id }, include: course_include, raw: true, nest: true, transaction });

    if (!course) return null;

    // if (course.visibility && user_role && !course.visibility.split(',').map((role: string) => role.trim().toLowerCase()).includes(user_role.trim().toLowerCase())) {
    //     return null;
    // }

    let sub_courses: any[] = await Course.findAll({ where: { ...filter, parent_id: course_id }, nest: true, raw: true });

    course.levels = course.levels || [];
    for (let sub_course_data of sub_courses) {
        let sub_course = await fetch_course_with_nested_data(sub_course_data.id, transaction, school_id, user_role);
        course.levels.push(sub_course);
    }

    course.materials = await StudyMaterial.findAll({ where: { course_id: course.id }, nest: true, raw: true, transaction });

    return course;
}


export async function link_file(column: string, id: number, purpose: string, url: string, transaction: Transaction) {
    try {
        const file: any = await File.findOne({ where: { url }, transaction });
        if (file) {
            await File.update(
                { [column]: id, purpose },
                { where: { id: file.id }, transaction }
            );
        }
    } catch (error) {
        console.error("Error linking file:", error);
        throw error;
    }
}

export default add_course_function;