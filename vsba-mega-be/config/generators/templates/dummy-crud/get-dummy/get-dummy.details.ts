import { get_dummy_body_schema } from "./get-dummy.body.schema";
import get_dummy_function from "./get-dummy.function";
import { get_dummy_query_schema } from "./get-dummy.query.schema";
import { get_dummy_tests } from "./get-dummy.test";
import { z } from "zod";

export let get_dummy_details = {
    module: 'Dummy',
    api_name: 'Get Dummy',
    api_description: 'Get Dummy Description',
    method: 'get',
    path: '/dummy/get-dummy',
    query_schema: z.object(get_dummy_query_schema).strict(),
    body_schema: z.object(get_dummy_body_schema).strict(),
    execution_function: get_dummy_function,
    tests: get_dummy_tests,
    roles: ['Public']
}