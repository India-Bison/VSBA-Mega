import { get_dummy_tests_interface } from "./get-dummy.interface";

export let get_dummy_tests: get_dummy_tests_interface[] = [
  {
    name: 'Will Get Dummy',
    input: {
      query: {
        id: 1
      }
    },
    check_output: (input, output) => {
      return input.query.id == output.data.id;
    },
  }
];
