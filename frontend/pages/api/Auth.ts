import express, { Request, Response, Router } from 'express';
import { OAuth2Client } from 'google-auth-library';

const authRouter = Router();
const authClient = new OAuth2Client('185496584407-89i5ueqb54cdd3172fp9pfca3up8mdn9.apps.googleusercontent.com')

authRouter.post('/verify', express.json(), async (req, res) => {
    console.log("verification")
});

export default authRouter;
export { authRouter };