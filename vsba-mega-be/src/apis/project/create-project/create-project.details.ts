import { create_project_body_schema } from "./create-project.body.schema";
import create_project_function from "./create-project.function";
import { create_project_query_schema } from "./create-project.query.schema";
import { create_project_tests } from "./create-project.test";
import { z } from "zod";

export let create_project_details = {
    module: 'Project',
    api_name: 'Create Project',
    api_description: 'Create Project Description',
    method: 'post',
    path: '/project/create-project',
    query_schema: z.object(create_project_query_schema).strict(),
    body_schema: create_project_body_schema.strict(),
    execution_function: create_project_function,
    tests: create_project_tests,
    roles: ['Public']
}