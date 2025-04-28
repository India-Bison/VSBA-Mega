import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@config/db/sequelize";
import { Project } from "@src/apis/project/project.model";
import { SlotGroup } from "./slot-group.model";

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
    onDelete: 'CASCADE'
  },
  slot_group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "slot_groups",
      key: "id",
    },
    allowNull: true,
    onDelete: 'CASCADE'
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

Project.hasMany(Slot, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Slot.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });

SlotGroup.hasMany(Slot, { foreignKey: 'slot_group_id', onDelete: 'CASCADE' });
Slot.belongsTo(SlotGroup, { foreignKey: 'slot_group_id', onDelete: 'CASCADE' })

//Command to Run : bun src\models/slot.model.ts 
// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });