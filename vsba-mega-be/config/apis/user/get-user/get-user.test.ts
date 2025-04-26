import { get_user_tests_interface } from "./get-user.interface";

export let get_user_tests: get_user_tests_interface[] = [
  {
    name: 'User Add Case',
    input: {
      email_id: 'test@gmail.com'
    },
    check_output: (input, output) => {
      return true
    },
  }
];
