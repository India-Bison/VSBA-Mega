import { get_dummy_list_body_schema } from "./get-dummy-list.body.schema";
import get_dummy_list_function from "./get-dummy-list.function";
import { get_dummy_list_query_schema } from "./get-dummy-list.query.schema";
import { get_dummy_list_tests } from "./get-dummy-list.test";
import { z } from "zod";

export let get_dummy_list_details = {
    module: 'Dummy',
    api_name: 'Get Dummy List',
    api_description: 'Get Dummy List Description',
    method: 'get',
    path: '/dummy/get-dummy-list',
    query_schema: z.object(get_dummy_list_query_schema).strict(),
    body_schema: z.object(get_dummy_list_body_schema).strict(),
    execution_function: get_dummy_list_function,
    tests: get_dummy_list_tests,
    roles: ['Public']
}