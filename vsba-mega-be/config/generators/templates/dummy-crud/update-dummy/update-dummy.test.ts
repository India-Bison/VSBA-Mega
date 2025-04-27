import { update_dummy_tests_interface } from "./update-dummy.interface";

export let update_dummy_tests: update_dummy_tests_interface[] = [
  {
    name: 'Dummy Gets Updated',
    input: {
      query: { id: 1 },
      body: {
        first_name: 'John',
        last_name: 'Doe',
      }
    },
    check_output: (input, output) => {
      // return true;
      return input.query.id == output.data.id
        && output.data.first_name == input.body.first_name
    },
  }
];
