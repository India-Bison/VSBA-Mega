import { get_calendar_list_tests_interface } from "./get-calendar-list.interface";

export let get_calendar_list_tests: get_calendar_list_tests_interface[] = [
  {
    name: 'Calendar List Case',
    input: { },
    check_output: (input, output) => { 
      return output.code == 200
    },
  }
];
