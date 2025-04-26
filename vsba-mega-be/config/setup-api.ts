import { Context } from "hono";
import { format_zod_error } from "./zod-validation.middleware";
import { setup_swagger } from "./setup-swagger";
import { validate_and_return_query } from "./validate-and-return-query";
import { validate_and_return_body } from "./validate-and-return-body";
import { send_response } from "./send-response";
import { send_error } from "./send-error";
import { app } from "./hono";
import { sequelize } from "./db/sequelize";
import { custom_error } from "./validation-function";

let skip_path = ['/activity/generate-activity', '/attendance/auto-check-out']

export let setup_api = async (details: any) => {
    try {
        // Setup Swagger Info for the Api
        let swagger_info: any = setup_swagger(details);
        app.openapi(swagger_info, async (c: Context) => {
            try {
                // Check and Validate Query
                let query = await validate_and_return_query(details.query_schema, c, details.allow_extra_keys)

                //Check and Validate Body
                let body = await validate_and_return_body(details.method, details.body_schema, c, details.allow_extra_keys)
                // console.log(query, body);
                const user = await c.get('user');
                const path = c.req.path;
                let path_valid = (skip_path.some(p => path.includes(p)));

                // if (!user) {
                //     if (path_valid) {
                //         console.log("User not found, but path is valid. Continuing execution...");
                //     } else {
                //         return c.json({ message: 'No User Found', data: user }, 404);
                //     }
                // }

                // Execute the Api using Execution Function
                let transaction = await sequelize.transaction();
                let response: any | unknown = await details.execution_function({ ...query, ...body, user: user }, transaction)

                // Commit the Transaction
                await transaction.commit();

                // Return the Response
                if (response instanceof Object) {
                    let code = response?.code || 200
                    return send_response(c, response, code, details)
                } else {
                    // This is success but response was not an object. Basically unexpected response
                    let message = details.api_name + ' Api was successful but response was unexpected'
                    return send_response(c, { message, response }, 205, details)
                }
            } catch (error: any) {
                // await transaction.rollback()
                // await custom_error(error, c)
                if (error.name === 'ZodError') {
                    let error_response = format_zod_error(error)
                    let code: any = error_response?.code || 400
                    return send_error(c, error_response, code, details)
                }
                if (error instanceof Object) {
                    let code = error?.code || 400
                    return send_error(c, error, code, details)
                } else {
                    let message = 'Uncaught ' + details.api_name + ' Api Error'
                    let code: any = error?.code || 400
                    return send_error(c, { message, error }, code, details)
                }
            }
        });
    } catch (error) {
        console.log(error)
        // await transaction.rollback()
        throw error;
    }
}