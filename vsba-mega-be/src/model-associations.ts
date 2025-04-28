
import { Project } from "@src/apis/project/project.model";
import { SlotGroup } from "./models/slot-group.model";

export const setupAssociations = () => {
  Project.hasMany(SlotGroup, { foreignKey: 'project_id' });
  SlotGroup.belongsTo(Project, { foreignKey: 'project_id' });
};