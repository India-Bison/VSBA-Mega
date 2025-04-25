import { DistrictCoordinator } from "@src/models/district-coordinator.model"
import { DivisionHead } from "@src/models/division-head.model"
import { Instructor } from "@src/models/instructor.model"
import { ProjectHead } from "@src/models/project-head.model"
import { User } from "@src/models/user.model"

export const create_db_user = async (user_data: any, keycloak_user_data: any, role: string, transaction: any) => {
    let new_user = await User.create({
        keyclock_user_id: keycloak_user_data.id,
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
    let user: any = await User.findOne({ where: { keyclock_user_id: id }, raw: true, transaction })
    if (user.role == 'Instructor') {
        let instructor: any = await Instructor.findOne({ where: { id: user.id }, raw: true, transaction })
        return {
            user,
            role_user_info: instructor
        }
    }
    if (user.role == 'Project Head') {
        let project_head: any = await ProjectHead.findOne({ where: { id: user.id }, raw: true, transaction })
        return {
            user,
            role_user_info: project_head
        }
    }
    if (user.role == 'District Coordinator') {
        let district_coordinator: any = await DistrictCoordinator.findOne({ where: { id: user.id }, raw: true, transaction })
        return {
            user,
            role_user_info: district_coordinator
        }
    }
    if (user.role == 'Division Head') {
        let division_head: any = await DivisionHead.findOne({ where: { id: user.id }, raw: true, transaction })
        return {
            user,
            role_user_info: division_head
        }
    }
}