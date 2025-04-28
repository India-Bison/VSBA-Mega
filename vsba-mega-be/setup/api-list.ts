import { get_user_details } from "@config/apis/user/get-user/get-user.details";
// Add Imports Here
import { create_project_details } from "@src/apis/project/create-project/create-project.details";
import { delete_project_details } from "@src/apis/project/delete-project/delete-project.details";
import { update_project_details } from "@src/apis/project/update-project/update-project.details";
import { get_project_list_details } from "@src/apis/project/get-project-list/get-project-list.details";
import { get_project_details } from "@src/apis/project/get-project/get-project.details";
import { delete_dummy_details } from "@config/generators/templates/dummy-crud/delete-dummy/delete-dummy.details";
import { get_dummy_list_details } from "@config/generators/templates/dummy-crud/get-dummy-list/get-dummy-list.details";
import { get_dummy_details } from "@config/generators/templates/dummy-crud/get-dummy/get-dummy.details";
import { update_dummy_details } from "@config/generators/templates/dummy-crud/update-dummy/update-dummy.details";
import { create_dummy_details } from "@config/generators/templates/dummy-crud/create-dummy/create-dummy.details";

export let api_list: any[] = [
    //User
    get_user_details,
    delete_dummy_details,
    get_dummy_list_details,
    get_dummy_details,
    update_dummy_details,
    create_dummy_details,

    // Add Apis Here

    //Project Apis
    create_project_details,
    delete_project_details,
    update_project_details,
    get_project_list_details,
    get_project_details,

]