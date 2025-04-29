import { update_project_body_schema } from "./update-project.body.schema";
import update_project_function from "./update-project.function";
import { update_project_query_schema } from "./update-project.query.schema";
import { update_project_tests } from "./update-project.test";
import { z } from "zod";

export let update_project_details = {
    module: 'Project',
    api_name: 'Update Project',
    api_description: 'Update Project Description',
    method: 'post',
    path: '/project/update-project',
    query_schema: z.object(update_project_query_schema).strict(),
    body_schema: update_project_body_schema.strict(),
    execution_function: update_project_function,
    tests: update_project_tests,
    roles: ['Public']
}