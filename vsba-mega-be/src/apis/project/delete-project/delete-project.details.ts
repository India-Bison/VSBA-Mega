import { delete_project_body_schema } from "./delete-project.body.schema";
import delete_project_function from "./delete-project.function";
import { delete_project_query_schema } from "./delete-project.query.schema";
import { delete_project_tests } from "./delete-project.test";
import { z } from "zod";

export let delete_project_details = {
    module: 'Project',
    api_name: 'Delete Project',
    api_description: 'Delete Project Description',
    method: 'delete',
    path: '/project/delete-project',
    query_schema: z.object(delete_project_query_schema).strict(),
    body_schema: z.object(delete_project_body_schema).strict(),
    execution_function: delete_project_function,
    tests: delete_project_tests,
    roles: ['Public']
}