import { DataTypes, ModelOptions } from "sequelize";
import { sequelize } from "@config/db/sequelize";
import { User } from "@config/models/user.model";
import { SlotGroup } from "@src/models/slot-group.model";

let project_model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  full_venue_required: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  resource_type: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  audit_required: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  project_start_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  project_end_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  week_days: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  slot_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
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
  test_data: {
    type: DataTypes.BOOLEAN,
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
    // where: {},
    // attributes: [],
    include: [
      { model: User, as: 'project_created_by_user', attributes: ['id', 'first_name', 'last_name'] },
      { model: User, as: 'project_updated_by_user', attributes: ['id', 'first_name', 'last_name'] },
    ]
  },
  // scopes: {
  //   scope_1: {
  //     where: {
  //       isActive: true
  //     }
  //   },
  //   scope_with_variable: (name: any) => {
  //     return {
  //       where: { name }
  //     }
  //   }
  // }
};

export const Project = sequelize.define("project", project_model, model_options);

User.hasMany(Project, { foreignKey: 'created_by_id', as: 'project_created_by' });
Project.belongsTo(User, { foreignKey: 'created_by_id', as: 'project_created_by_user' });

User.hasMany(Project, { foreignKey: 'updated_by_id', as: 'project_updated_by' });
Project.belongsTo(User, { foreignKey: 'updated_by_id', as: 'project_updated_by_user' });

SlotGroup.hasMany(Project, { foreignKey: 'slot_group_id' });
Project.belongsTo(SlotGroup, { foreignKey: 'slot_group_id' });

//Command to Run : bun src/apis/path
// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });