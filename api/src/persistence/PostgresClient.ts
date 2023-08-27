import pg from "pg"

var env = process.env.NODE_ENV || 'local'
<<<<<<< HEAD
var postgresConfig = require('../../postgres/config')[env]
=======
var postgresConfig = require('./config')[env]
>>>>>>> 2beb72a38f3956951eff9d71d20b937cb211fdcd

export default class PostgresClient {
    private pool: pg.Pool;

    constructor() {
        this.pool = new pg.Pool({
            database: postgresConfig.database,
            user: postgresConfig.user,
            password: postgresConfig.password,
            host: postgresConfig.host,
            port: postgresConfig.port,
            ssl: postgresConfig.sslEnabled,
            max: 20,
            idleTimeoutMillis: 1000,
<<<<<<< HEAD
            connectionTimeoutMillis: 1000
        });
    }

    async query(queryText: string): Promise<any> {
        try {
            const result = await this.pool.query(queryText);
=======
            connectionTimeoutMillis: 1000,
        });
    }

    async query(queryText: string, values?: any[]): Promise<any> {
        try {
            const result = await this.pool.query(queryText, values);
>>>>>>> 2beb72a38f3956951eff9d71d20b937cb211fdcd
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
}
