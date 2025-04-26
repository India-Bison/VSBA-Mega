import { update_dummy_tests_interface } from "./update-dummy.interface";

export let update_dummy_tests: update_dummy_tests_interface[] = [
  {
    name: 'Dummy Gets Updated',
    input: {
      id: 1
    },
    check_output: (input, output) => {
      return input.id == output.data.id;
    },
  }
];
