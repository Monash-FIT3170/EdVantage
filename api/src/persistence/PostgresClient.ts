import pg from "pg"

var env = process.env.NODE_ENV || 'local'
var postgresConfig = require('../../postgres/config')[env]

export default class PostgresClient {
    private pool: pg.Pool;

    constructor() {
        console.log(postgresConfig.database)
        console.log(postgresConfig.host)
        console.log(postgresConfig.port)
        console.log(postgresConfig.user)
        console.log(postgresConfig.user)
        console.log(postgresConfig.databaseURL)
        this.pool = new pg.Pool({
            database: postgresConfig.database,
            user: postgresConfig.user,
            password: postgresConfig.password,
            host: postgresConfig.host,
            port: postgresConfig.port,
            ssl: postgresConfig.sslEnabled,
            max: 20,
            idleTimeoutMillis: 1000,
            connectionTimeoutMillis: 1000
        });
    }

    async query(queryText: string): Promise<any> {
        try {
            const result = await this.pool.query(queryText);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
}
