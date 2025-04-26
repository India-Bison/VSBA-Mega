
import dotenv from 'dotenv';
import jwt, { decode } from 'jsonwebtoken'
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { find_keycloak_user_by_email } from '@src/common/keycloak.functions';
import { get_user_by_keycloak_id } from '@src/common/user.functions';

dotenv.config();

const user_cache = new Map<string, any>();
export const keycloakAdmin = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_URL,
    realmName: process.env.KEYCLOAK_REALM
});
const skip_path = ['generate-activity', 'auto-check-out']

export const keycloak_auth_admin = async () => {
    try {
        await keycloakAdmin.auth({
            grantType: 'client_credentials',
            clientId: process.env.KEYCLOAK_BACKEND_CLIENT_ID || '',
            clientSecret: process.env.KEYCLOAK_BACKEND_CLIENT_SECRET
        });
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export const keycloak_auth = async (c: any, next: any) => {
    const path = c.req.path;
    if (skip_path.some(p => path.includes(p))) {
        await next();
        return;
    }
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded: any = decode(token, { complete: true });
        if (!decoded) throw new Error('Invalid token');
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_FRONTEND_CLIENT_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
        jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        const email = decoded.payload.email;

        if (user_cache.has(email)) {
            let user_data = await user_cache.get(email)
            await c.set("user", user_data);
            await next();
            return
        }
        let keycloak_user: any = await find_keycloak_user_by_email(decoded.payload.email)
        let db_user: any = await get_user_by_keycloak_id(keycloak_user.id)
        let user = {
            user_id: db_user.user.id,
            role: db_user.user.role,
            user_f_name: db_user.user.first_name,
            user_m_name: db_user.user.middle_name,
            user_l_name: db_user.user.last_name,
            role_id: db_user.role_user_info.id,
            role_f_name: db_user.role_user_info.first_name,
            role_m_name: db_user.role_user_info.middle_name,
            role_l_name: db_user.role_user_info.last_name,
            role_info: db_user.role_user_info,
            keycloak_user_id: keycloak_user.id
        }
        // let user_data = { db_user, keycloak_user };
        // console.log(user, 'User Data Fron DB');
        await c.set('user', user);
        user_cache.set(email, user);
        await next();
        return
    } catch (error: any) {
        return c.json({ error: `Invalid or expired token,${error}` }, 401);
    }
}

export const keycloak_role_auth = (requiredRole: string) => {
    return async (c: any, next: any) => {
        const user = await c.get('user');
        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const userRoles = user.realm_access?.roles || [];

        if (!userRoles.includes(requiredRole)) {
            return c.json({ error: 'Forbidden: Insufficient permissions' }, 403);
        }
        await next();
        return
    };
};