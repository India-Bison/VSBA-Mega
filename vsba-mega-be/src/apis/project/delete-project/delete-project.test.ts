import { delete_project_tests_interface } from "./delete-project.interface";

export let delete_project_tests: delete_project_tests_interface[] = [
  {
    name: 'Project Gets Deleted',
    input: {
      query: {
        id: 1
      }
    },
    check_output: (input, output) => {
      return output.code == 200;
    },
  }
];
