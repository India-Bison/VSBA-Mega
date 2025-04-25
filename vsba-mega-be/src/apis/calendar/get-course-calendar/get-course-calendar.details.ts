import { get_course_calendar_body_schema } from "./get-course-calendar.body.schema";
import get_course_calendar_function from "./get-course-calendar.function";
import { get_course_calendar_query_schema } from "./get-course-calendar.query.schema";
import { get_course_calendar_tests } from "./get-course-calendar.test";
import { z } from "zod";

export let get_course_calendar_details = {
    module: 'Calendar',
    api_name: 'Get Course Calendar',
    api_description: 'Get Course Calendar Description',
    method: 'get',
    path: '/calendar/get-course-calendar',
    query_schema: z.object(get_course_calendar_query_schema).strict(),
    body_schema: z.object(get_course_calendar_body_schema).strict(),
    execution_function: get_course_calendar_function,
    tests: get_course_calendar_tests,
    roles: ['Public']
}