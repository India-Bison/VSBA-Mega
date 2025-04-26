import { get_main_course_calendar_list_body_schema } from "./get-main-course-calendar-list.body.schema";
import get_main_course_calendar_list_function from "./get-main-course-calendar-list.function";
import { get_main_course_calendar_list_query_schema } from "./get-main-course-calendar-list.query.schema";
import { get_main_course_calendar_list_tests } from "./get-main-course-calendar-list.test";
import { z } from "zod";

export let get_main_course_calendar_list_details = {
    module: 'Calendar',
    api_name: 'Get Main Course Calendar List',
    api_description: 'Get Main Course Calendar List Description',
    method: 'post',
    path: '/calendar/get-main-course-calendar-list',
    query_schema: z.object(get_main_course_calendar_list_query_schema).strict(),
    body_schema: z.object(get_main_course_calendar_list_body_schema).strict(),
    execution_function: get_main_course_calendar_list_function,
    tests: get_main_course_calendar_list_tests,
    roles: ['Public']
}