import { ZodError } from "zod"

export let format_zod_error = (error: ZodError) => {
  let error_object = {
    "issues": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": [
          "password"
        ],
        "message": "Required"
      }
    ],
    "name": "ZodError"
  }
  // Format this in type,error format
  let formatted_errors: any = error.format();
  delete formatted_errors._errors;
  let errors: any = {}
  Object.keys(formatted_errors).forEach((key: string) => {
    let error = formatted_errors[key]
    errors[key] = error._errors[0]
  })

  let error_response = { code: 400, type: 'Validation Error', error: errors }
  return error_response
}