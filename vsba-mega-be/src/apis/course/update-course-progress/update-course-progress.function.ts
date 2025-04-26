import { Error_Interface } from "@config/interfaces/error.interface"
import { update_course_progress_function_params, update_course_progress_function_return } from "./update-course-progress.interface"
import { Transaction } from "sequelize"
import { Calendar } from "@src/models/calendar.model"
import { Course } from "@src/models/course.model"
import { get_course_content_counts } from "@src/apis/calendar/add-calendar/add-calendar.function"
import moment from "moment"

let update_course_progress_function = async (data: update_course_progress_function_params, transaction: Transaction): Promise<update_course_progress_function_return | Error_Interface> => {
    try {
        let is_main_course_scheduled = await Calendar.findOne({ where: { course_id: data.main_course_id, main_course_id: data.main_course_id, school_id: data.school_id } })
        if (!is_main_course_scheduled) {
            return {
                code: 400,
                message: 'Please Schedule Course Before Marking Progress'
            };
        }

        const current_date = moment().format('YYYY-MM-DD');
        let course_progress_exists: any = await Calendar.findOne({
            where: {
                instructor_id: data.user.user_id,
                school_id: data.school_id,
                academic_year_id: data.academic_year_id,
                main_course_id: data.main_course_id,
                course_id: data.course_id
            },
            raw: true
        });
        data.instructor_id = data.user.user_id;

        if (!course_progress_exists) {
            course_progress_exists = await Calendar.create(
                {
                    ...data,
                    theory_marked_date: data.theory ? current_date : null,
                    practical_marked_date: data.practical ? current_date : null,
                    class_exercise_marked_date: data.class_exercise ? current_date : null,
                    pbl_marked_date: data.pbl ? current_date : null,
                    assessment_marked_date: data.assessment ? current_date : null,
                },
                { transaction }
            );
        } else {
            // Update existing progress    
            if ('theory' in data) data.theory_marked_date = data.theory ? current_date : null;
            if ('practical' in data) data.practical_marked_date = data.practical ? current_date : null;
            if ('class_exercise' in data) data.class_exercise_marked_date = data.class_exercise ? current_date : null;
            if ('pbl' in data) data.pbl_marked_date = data.pbl ? current_date : null;
            if ('assessment' in data) data.assessment_marked_date = data.assessment ? current_date : null;

            let [calendar, [updated_calendar]] = await Calendar.update({
                ...data,
                theory_marked_date: data.theory ? current_date : null,
                practical_marked_date: data.practical ? current_date : null,
                class_exercise_marked_date: data.class_exercise ? current_date : null,
                pbl_marked_date: data.pbl ? current_date : null,
                assessment_marked_date: data.assessment ? current_date : null,
            }, { where: { id: course_progress_exists.id }, returning: true, transaction });
            course_progress_exists = updated_calendar.toJSON()
        }

        // Mark completion status
        await mark_course_completion(course_progress_exists, data.instructor_id, current_date, data, transaction);

        return {
            code: 200,
            message: course_progress_exists ? 'Course Progress Created' : 'Update Course Progress Successful'
        };
    } catch (error) {
        throw error;
    }
};

export default update_course_progress_function;

// Completion checker remains the same
async function mark_course_completion(calendar_course_info: any, user_id: any, current_date: string, data: any, transaction: Transaction) {
    try {
        const updated_course_calendar: any = await Course.findOne({
            where: { id: calendar_course_info.course_id },
            attributes: ['course_content', 'main_parent_id'],
            raw: true,
            transaction
        });

        const required_fields = updated_course_calendar.course_content || ['theory', 'practical', 'class_exercise', 'pbl', 'assessment'];
        let is_complete = required_fields.every((field: any) => calendar_course_info[field] === true);

        await Calendar.update(
            {
                completion_date: is_complete ? current_date : null,
                is_completed: is_complete,
                completion_marked_by_id: is_complete ? user_id : null
            },
            { where: { course_id: calendar_course_info.course_id }, transaction }
        );

        await get_course_content_counts(updated_course_calendar.main_parent_id, data.school_id, data.academic_year_id, transaction)
    } catch (error) {
        throw error
    }
}