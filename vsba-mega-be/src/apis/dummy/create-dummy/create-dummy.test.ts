import { create_dummy_tests_interface } from "./create-dummy.interface";

export let create_dummy_tests: create_dummy_tests_interface[] = [
  {
    name: 'Dummy Gets Created',
    input: {
      first_name: 'Akash',
      last_name: 'Sadavarte'
    },
    check_output: (input, output) => {
      return true;
    },
  }
];
