import { sequelize } from "@config/db/sequelize";
import { DataTypes, ModelOptions } from "sequelize";

let user_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  keycloak_user_id: {
    type: DataTypes.STRING,
  },
  keycloak_user_name: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  middle_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alternate_contact_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  }
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

export const User = sequelize.define("user", user_model, model_options);

// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });
