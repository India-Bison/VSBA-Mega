export let dummyModelTemplate = `import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@config/db/sequelize";

let {{SnakeCaseModelName}}_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: "users",
  //     key: "id",
  //   },
  //   allowNull: true,
  // },
  stringField: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  integerField: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  floatField: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  doubleField: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  booleanField: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  dateField: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Other Data Types
  textField: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  blobField: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  jsonField: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  // Enum Data Type
  enumField: {
    type: DataTypes.ENUM("Option1", "Option2", "Option3"),
    allowNull: true,
  },
  // Array Data Types (PostgreSQL Only)
  stringArrayField: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  integerArrayField: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
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
  // defaultScope: {
  //   where: {},
  //   attributes: [],
  //   include: []
  // },
  // scopes: {
  //   scope_1: {
  //     where: {
  //       isActive: false
  //     }
  //   },
  //   scope_with_variable: (name: any) => {
  //     return {
  //       where: { name }
  //     }
  //   }
  // }
};

export const {{PascalCaseModelName}} = sequelize.define("{{PascalCaseModelName}}", {{SnakeCaseModelName}}_model, model_options);

// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });

`
