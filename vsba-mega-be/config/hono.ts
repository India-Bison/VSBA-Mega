import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { sequelize } from './db/sequelize'
import { keycloak_auth } from './middlewares/keycloak-auth.middleware'
import { check_role_middleware } from '@src/middlewares/check-role.middleware'
// import '../crons/attachment.cron';

export const app = new OpenAPIHono()

// sequelize.sync({ alter: true }).then(() => { console.log("Database Connected!") }).catch((err) => { console.log(err) });

app.get(
    '/swagger',
    swaggerUI({
        url: '/doc'
    })
)

app.doc('/doc', {
    info: {
        title: 'An API',
        version: 'v1'
    },
    openapi: '3.1.0'
})

app.use('*', cors());
// app.use('*', keycloak_auth);
// app.use('*', check_role_middleware);
