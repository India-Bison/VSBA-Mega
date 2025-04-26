import { get_user_details } from "@config/apis/user/get-user/get-user.details";
// Add Imports Here
import { create_dummy_details } from "@src/apis/dummy/create-dummy/create-dummy.details";

export let api_list: any[] = [
    //User
    get_user_details,
    // Add Apis Here
    create_dummy_details,
]