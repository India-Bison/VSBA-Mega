import { get_dummy_tests_interface } from "./get-dummy.interface";

export let get_dummy_tests: get_dummy_tests_interface[] = [
  {
    name: 'Will Get Dummy',
    input: {
      id: 9
    },
    check_output: (input, output) => {
      console.log('input', input.id, output.data);
      return input.id == output.data.id;
    },
  }
];
