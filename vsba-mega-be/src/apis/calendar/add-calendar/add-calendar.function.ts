import { Error_Interface } from "@config/interfaces/error.interface"
import { add_calendar_function_params, add_calendar_function_return } from "./add-calendar.interface"
import { Op, Transaction } from "sequelize"
import { Calendar } from "@src/models/calendar.model"
import moment from "moment"
import { Holiday } from "@src/models/holiday.model"
import { InstructorAssignment } from "@src/models/instructor-assignment.model"
import { Leave } from "@src/models/leave.model"
import { Course } from "@src/models/course.model"
import { Assessment } from "@src/models/assessment.model"

let add_calendar_function = async (data: add_calendar_function_params, transaction: Transaction): Promise<add_calendar_function_return | Error_Interface> => {
    let instructor_assignement = await InstructorAssignment.findAll({ where: { school_id: data.school_id, status: true }, raw:true })
    if (instructor_assignement.length == 0) {
        return {
            code: 400,
            message: `Please Assign Instructor to School with ID ${data.school_id} before Scheduling the Course!`,
            data: instructor_assignement
        };
    }
    
    const calendar_exists = await Calendar.findAll({
        where: {
            academic_year_id: data.academic_year_id,
            course_id: data.course_id,
            school_id: data.school_id
        }, raw: true
    });

    if (calendar_exists.length > 0) {
        await rescheduled_calendar(data, transaction);
    } else {
        await create_main_course_entry(data, transaction);
        await rescheduled_calendar(data, transaction);
    }

    await get_course_content_counts(data.course_id, data.school_id, data.academic_year_id, transaction);
    await Calendar.update({ status: 'Scheduled', is_scheduled: true }, { where: { academic_year_id: data.academic_year_id, course_id: data.course_id, school_id: data.school_id }, transaction })

    return {
        code: 200,
        message: 'Calendar created or rescheduled successfully!',
        data: data
    };
}

export default add_calendar_function

const handle_assessment = async (sub_course: any, data: any, transaction: any) => {
    if (sub_course.is_assessment) {
        const existing_assessment: any = await Assessment.findOne({
            where: {
                course_id: sub_course.id,
                school_id: data.school_id,
                academic_year_id: data.academic_year_id,
            },
            transaction,
            raw: true,
        });

        if (!existing_assessment) {
            const sub_course_info: any = await Course.findOne({ where: { id: sub_course?.id }, transaction })
            const grade_info: any = await Course.findOne({ where: { id: sub_course?.main_parent_id }, transaction })
            const assessment: any = await Assessment.create({
                course_id: sub_course.id,
                school_id: data.school_id,
                academic_year_id: data.academic_year_id,
                assessment_type_id: sub_course_info?.assessment_type_id,
                total_marks: sub_course_info?.total_marks,
                due_date: sub_course_info?.due_date,
                description: sub_course_info?.assessment_description,
                grade_id: grade_info?.grade_id
            }, { transaction });

            return assessment.id;
        }

        return existing_assessment.id;
    }

    return null;
};


const process_calendar = async (data: any, sub_topic_info: any, valid_dates: any, transaction: any) => {
    const { school_id, course_id, academic_year_id } = data;
    let completion_date = valid_dates[valid_dates.length - 1];
    const instructor_info: any = await InstructorAssignment.findOne({ where: { school_id, academic_year_id, status: true }, raw: true });

    await Calendar.update({
        completion_date: completion_date,
        scheduled_date: valid_dates[0]
    }, {
        where: { main_course_id: course_id, course_id: course_id, academic_year_id },
        transaction
    });

    for (let i = 0; i < sub_topic_info.length && i < valid_dates.length; i++) {
        const sub_topic = sub_topic_info[i];
        const assigned_date = valid_dates[i];
        const assessment_id = await handle_assessment(sub_topic, data, transaction);

        const existing_calendar_course = await Calendar.findOne({
            where: { main_course_id: course_id, course_id: sub_topic.id, academic_year_id, school_id },
            transaction
        });

        if (existing_calendar_course) {
            await Calendar.update({
                completion_date: completion_date,
                scheduled_date: assigned_date,
                status: 'Scheduled',
                is_scheduled: true,
                assessment_id
            }, {
                where: { main_course_id: course_id, course_id: sub_topic.id, school_id },
                transaction
            });
        } else {
            await Calendar.create({
                school_id,
                main_course_id: course_id,
                course_id: sub_topic.id,
                academic_year_id,
                instructor_id: instructor_info?.instructor_id || null,
                completion_date: completion_date,
                scheduled_date: assigned_date,
                status: 'Scheduled',
                is_scheduled: true,
                assessment_id
            }, { transaction });
        }
    }
};


const rescheduled_calendar = async (data: any, transaction: any) => {
    const sub_topic_info = await Course.findAll({
        where: { main_parent_id: data.course_id },
        order: ['id'],
        attributes: ['id', 'parent_id', 'main_parent_id', 'is_assessment'],
        raw: true,
        transaction
    });

    const valid_dates = await generate_valid_dates(data, sub_topic_info.length, transaction);
    await process_calendar(data, sub_topic_info, valid_dates, transaction);

    const completion_date = valid_dates[valid_dates.length - 1];
    await get_course_content_counts(data.course_id, data.school_id, data.academic_year_id, transaction);

    await Calendar.update({
        completion_date: completion_date
    }, {
        where: {
            main_course_id: data.course_id,
            school_id: data.school_id,
            academic_year_id: data.academic_year_id
        },
        transaction
    });
};

const generate_valid_dates = async (data: any, course_duration: any, transaction: any) => {
    const { scheduled_date } = data;
    const holiday_info = await Holiday.findAll({
        where: {
            date: { [Op.gte]: scheduled_date, [Op.lte]: moment(scheduled_date).add(course_duration + 30, 'days').format('YYYY-MM-DD') }
        },
        attributes: ['date'],
        raw: true,
        transaction
    });

    const holidays_set = new Set(holiday_info.map((h: any) => h.date));
    let leave_set = new Set();

    const instructor_info: any = await InstructorAssignment.findOne({ where: { school_id: data.school_id, academic_year_id: data.academic_year_id, status: true }, raw: true });
    if (instructor_info?.instructor_id) {
        const leaves = await Leave.findAll({
            where: {
                instructor_id: instructor_info.instructor_id,
                date: { [Op.gte]: scheduled_date, [Op.lte]: moment(scheduled_date).add(course_duration + 30, 'days').format('YYYY-MM-DD') },
                status: 'Approved'
            },
            attributes: ['date'],
            raw: true,
            transaction
        });
        leave_set = new Set(leaves.map((l: any) => l.date));
    }

    let valid_dates = [];
    let current_date = moment(scheduled_date, 'YYYY-MM-DD');
    while (valid_dates.length < course_duration) {
        const current_date_string = current_date.format('YYYY-MM-DD');
        if (current_date.day() !== 0 && !holidays_set.has(current_date_string) && !leave_set.has(current_date_string)) {
            valid_dates.push(current_date_string);
        }
        current_date.add(1, 'day');
    }
    return valid_dates;
};

const create_main_course_entry = async (data: any, transaction: any) => {
    const instructor_info: any = await InstructorAssignment.findOne({
        where: { school_id: data.school_id, academic_year_id: data.academic_year_id, status: true },
        transaction,
        raw: true
    });

    await Calendar.create({
        school_id: data.school_id,
        main_course_id: data.course_id,
        course_id: data.course_id,
        academic_year_id: data.academic_year_id,
        instructor_id: instructor_info?.instructor_id || null,
        completion_date: null,
        scheduled_date: data.scheduled_date,
        assessment_id: null
    }, { transaction });
};

export const get_course_content_counts = async (course_id: any, school_id: any, academic_year_id: any, transaction: any) => {
    const course_info: any = await Course.findOne({ where: { id: course_id }, raw: true });
    let total_content_count = 0;
    let marked_content_count = 0;

    const get_all_child_courses = async (courseId: any, transaction: any) => {
        const children: any = await Course.findAll({
            where: { parent_id: courseId },
            attributes: ['id'],
            raw: true,
            transaction
        });

        let all_children = [...children.map((c: any) => c.id)];
        for (const child of children) {
            const sub_children = await get_all_child_courses(child.id, transaction);
            all_children = [...new Set([...all_children, ...sub_children])];
        }

        return all_children;
    };

    const calculate_content_counts = async (courseId: any) => {
        console.log(`Calculating counts for Course ID: ${courseId}`);

        const sub_courses: any = await Course.findAll({
            where: { parent_id: courseId },
            attributes: ['id', 'is_assessment'],
            raw: true,
            transaction
        });

        console.log(`Sub-courses for ${courseId}:`, sub_courses.map((c: any) => c.id));

        let local_total_content_count = 0;
        let local_marked_content_count = 0;

        if (sub_courses.length === 0) {
            const sub_course_info: any = await Course.findOne({ where: { id: courseId }, raw: true });
            const content_types = sub_course_info.course_content || ['theory', 'practical', 'class_exercise', 'pbl', 'assessment'];
            if (sub_course_info.is_assessment) {
                local_total_content_count += 1;
            } else {
                local_total_content_count = content_types.length;
            }
            for (const content_type of content_types) {
                const content_count = await Calendar.count({
                    where: {
                        course_id: courseId,
                        school_id,
                        academic_year_id,
                        [content_type]: true
                    },
                    transaction
                });
                local_marked_content_count += content_count > 0 ? 1 : 0;
            }
        } else {
            for (const sub_course of sub_courses) {
                const sub_counts = await calculate_content_counts(sub_course.id);
                local_total_content_count += sub_counts.total;
                local_marked_content_count += sub_counts.marked;
            }
        }

        local_total_content_count = Math.max(local_total_content_count, 1);

        console.log(local_marked_content_count, local_total_content_count, "------");

        // Calculate progress percentage
        const progress_percentage = local_total_content_count > 0
            ? Math.round((local_marked_content_count / local_total_content_count) * 100)
            : 0;

        const is_completed = local_marked_content_count === local_total_content_count;
        const completion_date = is_completed ? moment().format('YYYY-MM-DD') : null;

        await Calendar.update(
            {
                total_content_count: local_total_content_count,
                marked_content_count: local_marked_content_count,
                progress: progress_percentage,
                is_completed,
                completion_date
            },
            {
                where: {
                    course_id: courseId,
                    school_id,
                    academic_year_id
                },
                transaction
            }
        );

        console.log(`Course ID: ${courseId}, Total Content Count: ${local_total_content_count}, Marked Content Count: ${local_marked_content_count}, Progress: ${progress_percentage}%, Completed: ${is_completed}`);

        return { total: local_total_content_count, marked: local_marked_content_count, progress: progress_percentage };
    };

    const final_counts = await calculate_content_counts(course_id);
    total_content_count = final_counts.total;
    marked_content_count = final_counts.marked;

    // Update parent course progress
    const parent_course: any = await Course.findOne({ where: { id: course_info.parent_id }, raw: true });
    if (parent_course) {
        console.log(`Updating parent course progress for Course ID: ${parent_course.id}`);
        const parent_progress = await get_course_content_counts(parent_course.id, school_id, academic_year_id, transaction);

        // Aggregate child progress to parent
        const total_children = await Course.count({ where: { parent_id: parent_course.id }, transaction });
        const updated_progress = total_children > 0 ? Math.round((marked_content_count / total_content_count) * 100) : 0;

        const parent_is_completed = updated_progress === 100;
        const parent_completion_date = parent_is_completed ? moment().format('YYYY-MM-DD') : null;

        await Calendar.update(
            {
                progress: updated_progress,
                is_completed: parent_is_completed,
                completion_date: parent_completion_date
            },
            {
                where: {
                    course_id: parent_course.id,
                    school_id,
                    academic_year_id
                },
                transaction
            }
        );
    }
};
