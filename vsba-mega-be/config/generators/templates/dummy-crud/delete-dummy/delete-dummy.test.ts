import { delete_dummy_tests_interface } from "./delete-dummy.interface";

export let delete_dummy_tests: delete_dummy_tests_interface[] = [
  {
    name: 'Dummy Gets Deleted',
    input: {
      id: 1
    },
    check_output: (input, output) => {
      return output.code == 200;
    },
  }
];
