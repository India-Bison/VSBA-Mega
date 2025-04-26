import { api_list } from "@src/setup/api-list"

const skip_paths = ['swagger','/activity/generate-activity','/attendance/auto-check-out']

export const check_role_middleware = async (c: any, next: any) => {
    let  user = c.get('user');
    try {
        let api_data: any = Object.values(api_list).find((item: any) => item.path == c.req.path)
        let allowed_roles = api_data?.roles
        if (check_if_not_skipped_path(c.req.path)) { check_roles(user.db_user?.role, allowed_roles) }
        await next()
    } catch (error: any) {
        return c.json({ code: 401, message: 'Invalid Role to Access this Api' })
    }
}

const check_if_not_skipped_path = (current_path: any) => {
    try {
        let exists = skip_paths.find((path: string) => path.includes(current_path))
        if (exists) { return false }
        else { return true }
    } catch (error: any) {
        console.log(error);
    }
}
const check_roles = (user_role: any, allowed_roles: any) => {
    if (!allowed_roles) { throw { code: 401, message: 'No Allowed Roles Mentioned for the api or Mention Role Public inside allowed roles' } }
    let role = allowed_roles.includes(user_role)
    let is_public = allowed_roles.includes('Public')
    if (role || is_public) { return true }
    throw { code: 401, message: 'Invalid Role to Access this Api' }
}

