import { get_project_list_body_schema } from "./get-project-list.body.schema";
import get_project_list_function from "./get-project-list.function";
import { get_project_list_query_schema } from "./get-project-list.query.schema";
import { get_project_list_tests } from "./get-project-list.test";
import { z } from "zod";

export let get_project_list_details = {
    module: 'Project',
    api_name: 'Get Project List',
    api_description: 'Get Project List Description',
    method: 'get',
    path: '/project/get-project-list',
    query_schema: z.object(get_project_list_query_schema).strict(),
    body_schema: z.object(get_project_list_body_schema).strict(),
    execution_function: get_project_list_function,
    tests: get_project_list_tests,
    roles: ['Public']
}