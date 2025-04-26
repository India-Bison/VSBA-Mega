import { get_user_body_schema } from "./get-user.body.schema";
import get_user_function from "./get-user.function";
import { get_user_query_schema } from "./get-user.query.schema";
import { get_user_tests } from "./get-user.test";
import { z } from "zod";

export let get_user_details = {
    module: 'User',
    api_name: 'Get User',
    api_description: 'Get User Description',
    method: 'get',
    path: '/user/get-user',
    query_schema: z.object(get_user_query_schema).strict(),
    body_schema: z.object(get_user_body_schema).strict(),
    execution_function: get_user_function,
    tests: get_user_tests,
    roles: ['Public']
}