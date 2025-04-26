import { update_dummy_body_schema } from "./update-dummy.body.schema";
import update_dummy_function from "./update-dummy.function";
import { update_dummy_query_schema } from "./update-dummy.query.schema";
import { update_dummy_tests } from "./update-dummy.test";
import { z } from "zod";

export let update_dummy_details = {
    module: 'Dummy',
    api_name: 'Update Dummy',
    api_description: 'Update Dummy Description',
    method: 'post',
    path: '/dummy/update-dummy',
    query_schema: z.object(update_dummy_query_schema).strict(),
    body_schema: z.object(update_dummy_body_schema).strict(),
    execution_function: update_dummy_function,
    tests: update_dummy_tests,
    roles: ['Public']
}