export let validate_and_return_query = async (schema: any, c: any, allow_extra_data: boolean) => {
    try {
        let query = await schema.safeParse(c.req.query())
        return query?.data
    } catch (error) {
        throw error
    }
}