import { add_calendar_tests_interface } from "./add-calendar.interface";

export let add_calendar_tests: add_calendar_tests_interface[] = [
  {
    name: 'Calendar Add Case',
    input: {},
    check_output: (input, output) => { 
      return output.code == 200
    },
  }
];
