import { get_course_body_schema } from "./get-course.body.schema";
import get_course_function from "./get-course.function";
import { get_course_query_schema } from "./get-course.query.schema";
import { get_course_tests } from "./get-course.test";
import { z } from "zod";

export let get_course_details = {
    module: 'Course',
    api_name: 'Get Course',
    api_description: 'Get Course Description',
    method: 'get',
    path: '/course/get-course',
    query_schema: z.object(get_course_query_schema).strict(),
    body_schema: z.object(get_course_body_schema).strict(),
    execution_function: get_course_function,
    tests: get_course_tests,
    roles: ['Public']
}