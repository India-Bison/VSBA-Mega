import { add_course_body_schema } from "./add-course.body.schema";
import add_course_function from "./add-course.function";
import { add_course_query_schema } from "./add-course.query.schema";
import { add_course_tests } from "./add-course.test";
import { z } from "zod";

export let add_course_details = {
    module: 'Course',
    api_name: 'Add Course',
    api_description: 'Add Course Description',
    method: 'post',
    path: '/course/add-course',
    query_schema: z.object(add_course_query_schema).strict(),
    body_schema: add_course_body_schema.strict(),
    execution_function: add_course_function,
    tests: add_course_tests,
    roles: ['Public']
}