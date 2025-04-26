import { create_dummy_body_schema } from "./create-dummy.body.schema";
import create_dummy_function from "./create-dummy.function";
import { create_dummy_query_schema } from "./create-dummy.query.schema";
import { create_dummy_tests } from "./create-dummy.test";
import { z } from "zod";

export let create_dummy_details = {
    module: 'Dummy',
    api_name: 'Create Dummy',
    api_description: 'Create Dummy Description',
    method: 'post',
    path: '/dummy/create-dummy',
    query_schema: z.object(create_dummy_query_schema).strict(),
    body_schema: z.object(create_dummy_body_schema).strict(),
    execution_function: create_dummy_function,
    tests: create_dummy_tests,
    roles: ['Public']
}