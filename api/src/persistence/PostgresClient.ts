import pg from "pg"

var env = process.env.NODE_ENV || 'local'
var postgresConfig = require('./config')[env]

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
            connectionTimeoutMillis: 1000,
        });
    }

    getPool() {
        return this.pool;
    }

    async query(queryText: string, values?: any[]): Promise<any> {
        try {
            const result = await this.pool.query(queryText, values);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
}
