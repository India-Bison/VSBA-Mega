import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z)

export let delete_project_body_schema = {};