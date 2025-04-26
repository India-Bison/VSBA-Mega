import { get_course_tests_interface } from "./get-course.interface";

export let get_course_tests: get_course_tests_interface[] = [
  {
    name: 'Course Get Case',
    input: {
      id: 1
    },
    check_output: (input, output) => {
      return input.id == output.data.id;
    },
  }
];
