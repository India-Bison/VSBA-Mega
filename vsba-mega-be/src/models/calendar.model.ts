import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@src/setup/sequelize";
import { School } from "./school.model";
import { AcademicYear } from "./academic-year.model";
import { Instructor } from "./instructor.model";
import { Course } from "./course.model";
import { Assessment } from "./assessment.model";

let calendar_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    allowNull: true,
  },
  main_course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    allowNull: true,
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "instructors",
      key: "id",
    },
    allowNull: true,
  },
  school_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "schools",
      key: "id",
    },
    allowNull: true,
  },
  academic_year_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "academic-years",
      key: "id",
    },
    allowNull: true,
  },
  assessment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "assessments",
      key: "id",
    },
    allowNull: true,
  },
  scheduled_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completion_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completion_marked_by_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    allowNull: true,
  },
  practical: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  theory_marked_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  practical_marked_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  class_exercise_marked_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pbl_marked_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assessment_marked_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  theory: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  class_exercise: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  pbl: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  assessment: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  is_scheduled: {
    type: DataTypes.STRING,
    defaultValue: false,
    allowNull: true,
  },
  total_student_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total_uploaded_test_paper_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total_content_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  marked_content_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
    allowNull: true,
  },
};

let model_options: ModelOptions = <any>{
  indexes: [
    // {
    //     unique: true,
    //     fields: ['Your Model_id', 'Your Model_name'], //your column name
    //     name: 'unique_name_per_Model', //your massage
    // },
  ],
};

export const Calendar = sequelize.define("calendar", calendar_model, model_options);

School.hasMany(Calendar, { foreignKey: 'school_id' })
Calendar.belongsTo(School, { foreignKey: 'school_id' })

AcademicYear.hasMany(Calendar, { foreignKey: 'academic_year_id' })
Calendar.belongsTo(AcademicYear, { foreignKey: 'academic_year_id' })

Instructor.hasMany(Calendar, { foreignKey: 'instructor_id' })
Calendar.belongsTo(Instructor, { foreignKey: 'instructor_id' })

Course.hasMany(Calendar, { foreignKey: 'course_id' })
Calendar.belongsTo(Course, { as: 'course', foreignKey: 'course_id' });
Calendar.belongsTo(Course, { as: 'main_course', foreignKey: 'main_course_id' });

Assessment.hasMany(Calendar, { foreignKey: 'assessment_id', as: 'assessment_details' })
Calendar.belongsTo(Assessment, { foreignKey: 'assessment_id', as: 'assessment_details' })
