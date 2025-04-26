import { add_course_tests_interface } from "./add-course.interface";

export let add_course_tests: add_course_tests_interface[] = [
  {
    name: 'Course Add Case',
    input: {
      name: 'John Doe'
    },
    check_output: (input, output) => { },
  }
];
