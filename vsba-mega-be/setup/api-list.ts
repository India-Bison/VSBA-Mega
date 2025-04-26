import { get_user_details } from "@config/apis/user/get-user/get-user.details";
// Add Imports Here
import { delete_dummy_details } from "@config/generators/templates/dummy-crud/delete-dummy/delete-dummy.details";
import { get_dummy_list_details } from "@config/generators/templates/dummy-crud/get-dummy-list/get-dummy-list.details";
import { get_dummy_details } from "@config/generators/templates/dummy-crud/get-dummy/get-dummy.details";
import { update_dummy_details } from "@config/generators/templates/dummy-crud/update-dummy/update-dummy.details";
import { create_dummy_details } from "@config/generators/templates/dummy-crud/create-dummy/create-dummy.details";

export let api_list: any[] = [
    //User
    get_user_details,
    // Add Apis Here
    delete_dummy_details,
    get_dummy_list_details,
    get_dummy_details,
    update_dummy_details,
    create_dummy_details,
]