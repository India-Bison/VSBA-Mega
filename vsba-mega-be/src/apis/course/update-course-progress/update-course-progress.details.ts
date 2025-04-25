import { update_course_progress_body_schema } from "./update-course-progress.body.schema";
import update_course_progress_function from "./update-course-progress.function";
import { update_course_progress_query_schema } from "./update-course-progress.query.schema";
import { update_course_progress_tests } from "./update-course-progress.test";
import { z } from "zod";

export let update_course_progress_details = {
    module: 'Course',
    api_name: 'Update Course Progress',
    api_description: 'Update Course Progress Description',
    method: 'post',
    path: '/course/update-course-progress',
    query_schema: z.object(update_course_progress_query_schema).strict(),
    body_schema: z.object(update_course_progress_body_schema).strict(),
    execution_function: update_course_progress_function,
    tests: update_course_progress_tests,
    roles: ['Public']
}