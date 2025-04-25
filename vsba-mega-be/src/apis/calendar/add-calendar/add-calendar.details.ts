import { add_calendar_body_schema } from "./add-calendar.body.schema";
import add_calendar_function from "./add-calendar.function";
import { add_calendar_query_schema } from "./add-calendar.query.schema";
import { add_calendar_tests } from "./add-calendar.test";
import { z } from "zod";

export let add_calendar_details = {
    module: 'Calendar',
    api_name: 'Add Calendar',
    api_description: 'Add Calendar Description',
    method: 'post',
    path: '/calendar/add-calendar',
    query_schema: z.object(add_calendar_query_schema).strict(),
    body_schema: z.object(add_calendar_body_schema).strict(),
    execution_function: add_calendar_function,
    tests: add_calendar_tests,
    roles: ['Public']
}