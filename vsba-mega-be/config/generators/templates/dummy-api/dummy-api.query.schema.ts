import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let dummy_api_query_schema = {
    page: z.string().optional().openapi({ example: 'Page Number' }),
    page_size: z.string().optional().openapi({ example: 'Page Size' }),
    sort_by: z.string().optional().openapi({ example: 'Sort By' }),
    sort_order: z.string().optional().openapi({ example: 'Sort Order' }),
};