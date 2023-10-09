import { Request, Response, Router } from 'express';
import PostgresClient from '../persistence/PostgresClient';
import {parse} from "ts-jest";

const userRouter = Router();
const postgresClient = new PostgresClient();


// Get all users
userRouter.get("/users", async (_req: Request, res: Response) => {
    const users = await postgresClient.query("SELECT * FROM users")
    if (users) {
        res.status(200).send(users);
    } else {
        res.status(404).send('Users not found');
    }
});

// Get all units
userRouter.get("/units", async (_req: Request, res: Response) => {
    const units = await postgresClient.query("SELECT * FROM units")
    if (units) {
        res.status(200).send(units);
    } else {
        res.status(404).send('Units not found');
    }
});

// Get unit by unit code
userRouter.get("/units/:unit_code", async (_req: Request, res: Response) => {
    const unit_code = _req.params.unit_code.toUpperCase();

    const unitResp = await postgresClient.query(
        `SELECT * FROM units WHERE unit_code = $1`,
        [unit_code]
    );

    res.status(200).send(unitResp);
});

// Get all class_enrolments
userRouter.get("/class_enrolments", async (_req: Request, res: Response) => {
    const query = `SELECT ce.user_id, u.user_email, ce.class_num, ce.unit_code
                    FROM class_enrolments ce
                    JOIN users u ON ce.user_id = u.user_id
                    ORDER BY ce.user_id, ce.class_num, ce.unit_code`;
    const enrolments = await postgresClient.query(query);

    if (enrolments) {
        res.status(200).send(enrolments);
    } else {
        res.status(404).send('Enrolments not found');
    }
});

// Get all the classes that belong to a unit
userRouter.get("/units/:unit_code/classes", async (req: Request, res: Response) => {
    const unit_code = req.params.unit_code;
    const classes = await getClassesByUnit(unit_code);

    if (classes) {
        res.status(200).send(classes);
    } else {
        res.status(404).send('Classes not found');
    }
});

// Get all the users enrolled in a unit
userRouter.get("/units/:unit_code/users", async (req: Request, res: Response) => {
    const unit_code = req.params.unit_code;
    const users = await getUsersByUnit(unit_code);

    if (users) {
        res.status(200).send(users);
    } else {
        res.status(404).send('Users not found');
    }
});

// Get all the users who are enrolled in a class
userRouter.get("/classes/:unit_code/:class_num/users", async (req: Request, res: Response) => {
    const class_num = parseInt(req.params.class_num);
    const unit_code = req.params.unit_code;
    const users = await getUsersByClass(class_num, unit_code);

    if (users) {
        res.status(200).send(users);
    } else {
        res.status(404).send('Users not found');
    }
});


// Define a route to get a user by ID
userRouter.get('/user/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);

    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Define a route to get classes for a user by user ID
userRouter.get('/user/:id/classes', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const classes = await getUserClasses(id);

    if (classes) {
        res.status(200).send(classes);
    } else {
        res.status(404).send('Classes not found for the user');
    }
});

// Get all the units a user is enrolled in
userRouter.get("/users/:id/units", async (req: Request, res: Response) => {
    const id = req.params.id;
    const units = await getUserUnits(id);

    if (units) {
        res.status(200).send(units);
    } else {
        res.status(404).send('Units not found for the user');
    }
});


// Define a helper function to get classes that belong to a unit by unit code
async function getClassesByUnit(unit_code: string) {
    const query = `SELECT * FROM classes WHERE unit_code = $1`;
    const values = [unit_code];
    const classesResp = await postgresClient.query(query, values);
    return classesResp;
}

// Define a helper function to get users enrolled in a unit by unit code
async function getUsersByUnit(unit_code: string) {
    const query = `SELECT DISTINCT u.* FROM users u JOIN class_enrolments ce ON u.user_id = ce.user_id WHERE ce.unit_code = $1`;
    const values = [unit_code];
    const usersResp = await postgresClient.query(query, values);
    return usersResp;
}

async function getUsersByClass(class_num: number, unit_code: string) {
    const query = `
      SELECT u.*
      FROM users u
      JOIN class_enrolments ce ON u.user_id = ce.user_id
      WHERE ce.class_num = $1 AND ce.unit_code = $2`;
    const values = [class_num, unit_code];
    const usersResp = await postgresClient.query(query, values);
    return usersResp;
}

// Define a helper function to get a user by ID
async function getUserById(id: number) {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const values = [id];
    const userResp = await postgresClient.query(query, values);
    return userResp.length > 0 ? userResp[0] : null;
}

// Define a helper function to get classes for a user by user ID
async function getUserClasses(userId: number) {
    const query = `SELECT ce.user_id, c.class_num, c.unit_code
                    FROM class_enrolments ce
                    JOIN classes c ON ce.class_num = c.class_num AND ce.unit_code = c.unit_code
                    WHERE ce.user_id = $1`;
    const values = [userId];
    const classesResp = await postgresClient.query(query, values);
    return classesResp.length > 0 ? classesResp : null;
}

async function getUserUnits(user_id: string) {
    const query = `SELECT DISTINCT ue.unit_code, un.unit_name
                    FROM users u JOIN unit_enrollment ue on u.user_id = ue.user_id
                    JOIN units un ON ue.unit_code = un.unit_code
                    WHERE u.user_id = $1`;
    const values = [user_id];
    const unitsResp = await postgresClient.query(query, values);
    return unitsResp;
}


export default userRouter;
export { userRouter };