import { delete_dummy_body_schema } from "./delete-dummy.body.schema";
import delete_dummy_function from "./delete-dummy.function";
import { delete_dummy_query_schema } from "./delete-dummy.query.schema";
import { delete_dummy_tests } from "./delete-dummy.test";
import { z } from "zod";

export let delete_dummy_details = {
    module: 'Dummy',
    api_name: 'Delete Dummy',
    api_description: 'Delete Dummy Description',
    method: 'delete',
    path: '/dummy/delete-dummy',
    query_schema: z.object(delete_dummy_query_schema).strict(),
    body_schema: z.object(delete_dummy_body_schema).strict(),
    execution_function: delete_dummy_function,
    tests: delete_dummy_tests,
    roles: ['Public']
}