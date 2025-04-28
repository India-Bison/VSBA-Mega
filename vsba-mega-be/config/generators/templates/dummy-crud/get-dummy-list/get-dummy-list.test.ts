import { get_dummy_list_tests_interface } from "./get-dummy-list.interface";

export let get_dummy_list_tests: get_dummy_list_tests_interface[] = [
  {
    name: 'Dummy List | Without Filters',
    input: {
      query: {}
    },
    check_output: (input, output) => {
      return Array.isArray(output.data)
    },
  },
  {
    name: 'Dummy List | Name Filter',
    input: {
      query: {
        first_name: 'Akash 2'
      }
    },
    check_output: (input, output) => {
      return Array.isArray(output.data)
    },
  }
];
