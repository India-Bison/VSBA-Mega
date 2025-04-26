import { get_main_course_calendar_list_tests_interface } from "./get-main-course-calendar-list.interface";

export let get_main_course_calendar_list_tests: get_main_course_calendar_list_tests_interface[] = [
  {
    name: 'Get Main Course Calendar List Case',
    input: {},
    check_output: (input, output) => { 
      return output.code == 200
    },
  }
];
