import { User } from "@config/models/user.model"

export const create_db_user = async (user_data: any, keycloak_user_data: any, role: string, transaction: any) => {
    let new_user = await User.create({
        keycloak_user_id: keycloak_user_data.id,
        keycloak_user_name: keycloak_user_data.username,
        first_name: user_data.first_name || user_data.name,
        middle_name: user_data.middle_name || user_data.name,
        last_name: user_data.last_name || user_data.name,
        email_id: user_data.email_id || user_data.email,
        gender: user_data.gender || '',
        dob: user_data.dob,
        contact_number: user_data.contact_number || user_data.mobile_number,
        alternate_contact_number: user_data.alternate_contact_number || user_data.alternate_mobile_number,
        role: role,
        password: ''
    }, { returning: true, raw: true, transaction })
    return new_user
}

export const update_db_user = async (user_id: any, user_data: any, keycloak_user_data: any, transaction: any) => {
    let new_user = await User.update({
        keycloak_user_name: keycloak_user_data.username,
        first_name: user_data.first_name || user_data.name,
        middle_name: user_data.middle_name || user_data.name,
        last_name: user_data.last_name || user_data.name,
        email_id: user_data.email_id || user_data.email,
        gender: user_data.gender || '',
        dob: user_data.dob,
        contact_number: user_data.contact_number || user_data.mobile_number,
        alternate_contact_number: user_data.alternate_contact_number || user_data.alternate_mobile_number,
        password: ''
    }, { where: { id: user_id }, transaction })
    return new_user
}

export const delete_db_user = async (user_id: any, transaction: any) => {
    let user = await User.destroy({ where: { id: user_id }, transaction })
    return user
}

export const get_user_by_keycloak_id = async (id: any, transaction?: any) => {
    let user: any = await User.findOne({ where: { keycloak_user_id: id }, raw: true, transaction })
    return user
}