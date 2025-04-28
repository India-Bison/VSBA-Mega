export let validate_and_return_body = async (method: string, schema: any, c: any, allow_extra_data: boolean) => {
    try {
        let body = {}
        if (method === 'post') {
            let body_json = await c.req.json();
            body = schema.safeParse(body_json)?.data
        }
        return body
    } catch (error) {
        throw error
    }
}