import { update_course_tests_interface } from "./update-course.interface";

export let update_course_tests: update_course_tests_interface[] = [
  {
    name: 'Course Update Case',
    input: {
      id: 1
    },
    check_output: (input, output) => {
      return input.id == 200;
    },
  }
];
