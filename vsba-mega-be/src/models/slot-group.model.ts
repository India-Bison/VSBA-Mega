import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@config/db/sequelize";
import { Project } from "@src/apis/project/project.model";
import { User } from "@config/models/user.model";

let slot_group_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  start_time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slot_start_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slot_end_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hours: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_by_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    allowNull: true,
  },
  updated_by_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
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
  defaultScope: {
    //   where: {},
    // attributes: [],
    include: [
      { model: User, as: 'slot_group_created_by_user', attributes: ['id', 'first_name', 'last_name'] },
      { model: User, as: 'slot_group_updated_by_user', attributes: ['id', 'first_name', 'last_name'] },
    ]
  },
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

export const SlotGroup = sequelize.define("slot_group", slot_group_model, model_options);

//Command to Run : bun src\models/slot_group.model.ts 
// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });