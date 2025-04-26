import { dummy_api_body_schema } from "./dummy-api.body.schema";
import dummy_api_function from "./dummy-api.function";
import { dummy_api_query_schema } from "./dummy-api.query.schema";
import { dummy_api_tests } from "./dummy-api.test";
import { z } from "zod";

export let dummy_api_details = {
    module: 'User',
    api_name: 'Dummy Api',
    api_description: 'Dummy Api Description',
    method: 'get',
    path: 'dummy_api_path',
    query_schema: z.object(dummy_api_query_schema).strict(),
    body_schema: z.object(dummy_api_body_schema).strict(),
    execution_function: dummy_api_function,
    tests: dummy_api_tests,
    roles: ['Public']
}