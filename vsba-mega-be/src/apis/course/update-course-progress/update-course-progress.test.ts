import { update_course_progress_tests_interface } from "./update-course-progress.interface";

export let update_course_progress_tests: update_course_progress_tests_interface[] = [
  {
    name: 'Best Case',
    input: {
      instructor_id: 1,
      school_id: 1,
      academic_year_id: 1,
      main_course_id: 1,
      course_id: 1
    },
    check_output: (input, output) => { },
  }
];
