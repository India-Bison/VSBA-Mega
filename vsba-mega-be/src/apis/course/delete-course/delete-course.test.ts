import { delete_course_tests_interface } from "./delete-course.interface";

export let delete_course_tests: delete_course_tests_interface[] = [
  {
    name: 'Course Delete Case',
    input: {
      id: 1
    },
    check_output: (input, output) => {
      return output.code == 200;
    },
  }
];
