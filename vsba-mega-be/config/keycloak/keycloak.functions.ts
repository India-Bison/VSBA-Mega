import { keycloak_auth_admin, keycloakAdmin } from "@config/middlewares/keycloak-auth.middleware";

export const find_keycloak_user_by_email = async (email: any) => {
    await keycloak_auth_admin();
    const users = await keycloakAdmin.users.find({ email });
    return users.length > 0 ? users[0] : null;
};

export const find_keycloak_user_by_id = async (id: any) => {
    await keycloak_auth_admin();
    const users = await keycloakAdmin.users.find({ id });
    return users.length > 0 ? users[0] : null;
};

export const create_keycloak_user = async (user_data: any) => {
    await keycloak_auth_admin();
    const new_user = await keycloakAdmin.users.create({
        realm: 'master',
        email: user_data.email_id,
        firstName: user_data.first_name || user_data.name,
        lastName: user_data.last_name || user_data.name,
        enabled: true,
        username: user_data.email_id
    });
    let user: any = await find_keycloak_user_by_email(user_data.email_id)
    await set_user_password(user.id, 'password')
    return user;
}

export const update_keycloak_user = async (user_id: any, user_data: any) => {
    await keycloak_auth_admin();
    const updated_user = await keycloakAdmin.users.update(
        { id: user_id },
        {
            email: user_data.email_id,
            firstName: user_data.first_name || user_data.name,
            lastName: user_data.first_name || user_data.name,
            enabled: true,
            username: user_data.email_id
        }
    );
    let user: any = await find_keycloak_user_by_id(user_id)
    return user;
}

export const delete_keycloak_user = async (user_id: any) => {
    await keycloak_auth_admin();
    await keycloakAdmin.users.del({
        id: user_id,
        realm: 'master',
    });
}

const set_user_password = async (user_id: any, password: any) => {
    await keycloak_auth_admin();
    await keycloakAdmin.users.resetPassword({
        id: user_id,
        credential: {
            type: "password",
            value: password,
            temporary: true,
        },
    });
}