import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@src/setup/sequelize";
import { Grade } from "./grade.model";
import { AcademicYear } from "./academic-year.model";
import { AssessmentType } from "./assessment-type.model";
import { Subject } from "./subject.model";

let course_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  course_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  number_of_levels: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    allowNull: true,
    onDelete: "CASCADE"
  },
  main_parent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    allowNull: true,
    onDelete: "CASCADE"
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  grade_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "grades",
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
  subject_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "subjects",
      key: "id",
    },
    allowNull: true,
  },
  language: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  hindi_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  marathi_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hindi_course_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  marathi_course_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  english_course_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  start_day: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_day: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course_content: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  order: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  is_assessment: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
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
  visibility: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_marks: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  due_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assessment_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  assessment_type_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "assessment-types",
      key: "id",
    },
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

export const Course = sequelize.define("course", course_model, model_options);

Grade.hasMany(Course, { foreignKey: "grade_id" });
Course.belongsTo(Grade, { foreignKey: "grade_id" });

AcademicYear.hasMany(Course, { foreignKey: "academic_year_id" });
Course.belongsTo(AcademicYear, { foreignKey: "academic_year_id" });

Course.belongsTo(Course, { foreignKey: "main_parent_id", as: "main_parent", onDelete: "CASCADE" });

Course.belongsTo(Course, { foreignKey: "parent_id", as: "parent_course", onDelete: "CASCADE" });

// Course.hasOne(Assessment, { foreignKey: 'course_id', as: 'assessments' });

// Assessment.hasMany(Course, { foreignKey: "assessment_id" });
// Course.belongsTo(Course, { foreignKey: "assessment_id", as: "assessments" });

AssessmentType.hasMany(Course, { foreignKey: "assessment_type_id" });
Course.belongsTo(AssessmentType, { foreignKey: "assessment_type_id" });

Subject.hasMany(Course, { foreignKey: "subject_id" });
Course.belongsTo(Subject, { foreignKey: "subject_id" });