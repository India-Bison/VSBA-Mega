import { delete_course_body_schema } from "./delete-course.body.schema";
import delete_course_function from "./delete-course.function";
import { delete_course_query_schema } from "./delete-course.query.schema";
import { delete_course_tests } from "./delete-course.test";
import { z } from "zod";

export let delete_course_details = {
    module: 'Course',
    api_name: 'Delete Course',
    api_description: 'Delete Course Description',
    method: 'delete',
    path: '/course/delete-course',
    query_schema: z.object(delete_course_query_schema).strict(),
    body_schema: z.object(delete_course_body_schema).strict(),
    execution_function: delete_course_function,
    tests: delete_course_tests,
    roles: ['Public']
}