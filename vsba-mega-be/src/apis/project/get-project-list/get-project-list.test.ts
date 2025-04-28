import { get_project_list_tests_interface } from "./get-project-list.interface";

export let get_project_list_tests: get_project_list_tests_interface[] = [
  {
    name: 'Project List | Without Filters',
    input: {
      query: {}
    },
    check_output: (input, output) => {
      return Array.isArray(output.data)
    },
  },
  {
    name: 'Project List | Name Filter',
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
