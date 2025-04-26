import { get_dummy_list_tests_interface } from "./get-dummy-list.interface";

export let get_dummy_list_tests: get_dummy_list_tests_interface[] = [
  {
    name: 'Best Case',
    input: {
      name: 'John Doe'
    },
    check_output: (input, output) => { },
  }
];
