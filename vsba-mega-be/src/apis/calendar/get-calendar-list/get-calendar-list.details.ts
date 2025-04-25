import { get_calendar_list_body_schema } from "./get-calendar-list.body.schema";
import get_calendar_list_function from "./get-calendar-list.function";
import { get_calendar_list_query_schema } from "./get-calendar-list.query.schema";
import { get_calendar_list_tests } from "./get-calendar-list.test";
import { z } from "zod";

export let get_calendar_list_details = {
    module: 'Calendar',
    api_name: 'Get Calendar List',
    api_description: 'Get Calendar List Description',
    method: 'get',
    path: '/calendar/get-calendar-list',
    query_schema: z.object(get_calendar_list_query_schema).strict(),
    body_schema: z.object(get_calendar_list_body_schema).strict(),
    execution_function: get_calendar_list_function,
    tests: get_calendar_list_tests,
    roles: ['Public']
}