import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@config/db/sequelize";

let slot_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "projects",
      key: "id",
    },
    allowNull: true,
  },
  slot_group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "slot_groups",
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

export const Slot = sequelize.define("slot", slot_model, model_options);

//Command to Run : bun src\models/slot.model.ts 
// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });