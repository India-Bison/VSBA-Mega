import { update_course_body_schema } from "./update-course.body.schema";
import update_course_function from "./update-course.function";
import { update_course_query_schema } from "./update-course.query.schema";
import { update_course_tests } from "./update-course.test";
import { z } from "zod";

export let update_course_details = {
    module: 'Course',
    api_name: 'Update Course',
    api_description: 'Update Course Description',
    method: 'post',
    path: '/course/update-course',
    query_schema: z.object(update_course_query_schema).strict(),
    body_schema: update_course_body_schema.strict(),
    execution_function: update_course_function,
    tests: update_course_tests,
    roles: ['Public']
}