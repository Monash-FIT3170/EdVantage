import express, { Request, Response, Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import PostgresClient from '../persistence/PostgresClient';

const authRouter = Router();
const postgresClient = new PostgresClient();
const authClient = new OAuth2Client('185496584407-89i5ueqb54cdd3172fp9pfca3up8mdn9.apps.googleusercontent.com')

authRouter.post('/verify', express.json(), async (req, res) => {
    console.log("verification")
});

authRouter.get('/auth/userRole', async (req, res) => {
    const email = req.query.email;
    if (typeof email !== 'string') {
        return res.status(400).send('Email must be provided as a string');
    }
    const userRole = await getUserRoleByEmail(email);
    if (userRole) {
        res.status(200).send({ role: userRole });
    } else {
        res.status(404).send('User not found');
    }
});

async function getUserRoleByEmail(email: string) {
    const query = `
        SELECT roles.role_name
        FROM users
        JOIN roles ON users.role_id = roles.role_id
        WHERE users.user_email = $1;
    `;
    const values = [email];
    const roleResp = await postgresClient.query(query, values);
    return roleResp.length > 0 ? roleResp[0].role_name : null;
}

export default authRouter;
export { authRouter };