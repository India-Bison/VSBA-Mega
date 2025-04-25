import { get_course_list_body_schema } from "./get-course-list.body.schema";
import get_course_list_function from "./get-course-list.function";
import { get_course_list_query_schema } from "./get-course-list.query.schema";
import { get_course_list_tests } from "./get-course-list.test";
import { z } from "zod";

export let get_course_list_details = {
    module: 'Course',
    api_name: 'Get Course List',
    api_description: 'Get Course List Description',
    method: 'get',
    path: '/course/get-course-list',
    query_schema: z.object(get_course_list_query_schema).strict(),
    body_schema: z.object(get_course_list_body_schema).strict(),
    execution_function: get_course_list_function,
    tests: get_course_list_tests,
    roles: ['Public']
}