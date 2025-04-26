export interface update_course_progress_function_params {
    instructor_id?: number
    school_id?: number
    user?: any
    academic_year_id?: number
    main_course_id?: number
    course_id?: number
    practical?: boolean
    theory?: boolean
    class_exercise?: boolean
    pbl?: boolean
    assessment?: boolean
    theory_marked_date?: string | null
    practical_marked_date?: string | null
    class_exercise_marked_date?: string | null
    pbl_marked_date?: string | null
    assessment_marked_date?: string | null
    total_uploaded_test_paper_count?: string
    total_student_count?: string
}

export interface update_course_progress_function_return {
    code?: number,
    message: string,
    data?: any
}

export interface update_course_progress_tests_interface {
    name: string,
    input: update_course_progress_function_params,
    check_output?: (input: update_course_progress_function_params, output: update_course_progress_function_return) => void
}