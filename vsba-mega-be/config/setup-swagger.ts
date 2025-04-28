import { createRoute } from "@hono/zod-openapi"

export let setup_swagger = (details: any) => {
    try {
        let query = details.query_schema
        let body = {
            content: {
                'application/json': {
                    schema: details.body_schema
                }
            }
        }
        let request: any = {
            query,
            body
        }
        if (details.method === 'get') {
            delete request.body
        }
        return createRoute({
            method: details.method,
            path: details.path,
            request,
            summary: details.api_name,
            description: details.api_description,
            tags: [details.module],
            query: details.query_schema,
            requestBody: details.query_schema,
            responses: {
                200: {
                    description: 'Respond a message',
                    // content: {
                    //     'application/json': {
                    //         schema: details.query_schema
                    //     }
                    // }
                }
            }
        })
    } catch (error) {
        throw error
    }
}