import { get_project_body_schema } from "./get-project.body.schema";
import get_project_function from "./get-project.function";
import { get_project_query_schema } from "./get-project.query.schema";
import { get_project_tests } from "./get-project.test";
import { z } from "zod";

export let get_project_details = {
    module: 'Project',
    api_name: 'Get Project',
    api_description: 'Get Project Description',
    method: 'get',
    path: '/project/get-project',
    query_schema: z.object(get_project_query_schema).strict(),
    body_schema: z.object(get_project_body_schema).strict(),
    execution_function: get_project_function,
    tests: get_project_tests,
    roles: ['Public']
}