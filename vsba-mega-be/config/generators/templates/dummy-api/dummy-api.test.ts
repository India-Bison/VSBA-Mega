import { dummy_api_tests_interface } from "./dummy-api.interface";

export let dummy_api_tests: dummy_api_tests_interface[] = [
  {
    name: 'Best Case',
    input: {
      name: 'John Doe'
    },
    check_output: (input, output) => { },
  }
];
