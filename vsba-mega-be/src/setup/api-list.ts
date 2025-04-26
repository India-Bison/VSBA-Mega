import { add_calendar_details } from "@src/apis/calendar/add-calendar/add-calendar.details";
import { get_calendar_list_details } from "@src/apis/calendar/get-calendar-list/get-calendar-list.details";
import { get_course_calendar_details } from "@src/apis/calendar/get-course-calendar/get-course-calendar.details";
import { get_main_course_calendar_list_details } from "@src/apis/calendar/get-main-course-calendar-list/get-main-course-calendar-list.details";
import { add_course_details } from "@src/apis/course/add-course/add-course.details";
import { delete_course_details } from "@src/apis/course/delete-course/delete-course.details";
import { get_course_list_details } from "@src/apis/course/get-course-list/get-course-list.details";
import { get_course_details } from "@src/apis/course/get-course/get-course.details";
import { update_course_progress_details } from "@src/apis/course/update-course-progress/update-course-progress.details";
import { update_course_details } from "@src/apis/course/update-course/update-course.details";
import { get_user_details } from "@src/apis/user/get-user/get-user.details";

export let api_list: any[] = [
    //Course
    get_course_details,
    get_course_list_details,
    add_course_details,
    update_course_details,
    delete_course_details,
    //Course Progress 
    get_course_calendar_details,
    update_course_progress_details,
    //Calendar
    get_calendar_list_details,
    add_calendar_details,
    get_main_course_calendar_list_details,
    //User
    get_user_details,
]