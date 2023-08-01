import pg from "pg"

const allConfig: any = {
    local: {
        database: 'edvantage',
        host: 'localhost',
        port: '5432',
        user: 'admin',
        password: 'password',
        sslEnabled: false
    },
    development: {
        database: 'edvantage',
        host: 'localhost',
        port: '5432',
        user: 'admin',
        password: 'password',
        sslEnabled: false
    },
    docker: {
        database: 'edvantage',
        host: 'edvantage-postgres',
        port: '5432',
        user: 'admin',
        password: 'password',
        sslEnabled: false
    },
    dev: {
        database: 'DB NAME',
        host: 'RAILWAY DB HOST',
        port: 'RAILWAY DB PORT',
        user: 'DB USER',
        password: 'DB PASS',
        sslEnabled: false
    },
    prod: {
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        sslEnabled: false
    }
}

export default class PostgresClient {
    private pool: pg.Pool;

    constructor() {
        var env = process.env.NODE_ENV || 'local'
        var postgresConfig = allConfig[env]

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
