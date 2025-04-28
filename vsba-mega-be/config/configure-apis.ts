import { api_list } from "../setup/api-list";
import { setup_api } from "./setup-api";

export let configure_apis = async () => {
    try {
        for (let api of api_list) {
            setup_api(api)
        }
    } catch (error) {
        process.exit()
    }
};