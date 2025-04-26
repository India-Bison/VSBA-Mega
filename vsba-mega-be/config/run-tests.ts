import { api_list } from "../setup/api-list";
import { test_function } from "./test-function";

export let run_tests = async () => {
    try {
        if (process.env.RUN_TESTS === 'TRUE') {
            return;
        }
        console.log('----------------------- Running Tests -----------------------')
        for (let api of api_list) {
            console.log('-----')
            console.log('Running Tests for API:', api.module, '|', api.api_name)
            await test_function(api.tests, api.execution_function)
        }
        console.log('----------------------- Tests Successful -----------------------')
    } catch (error) {
        process.exit()
    }

};