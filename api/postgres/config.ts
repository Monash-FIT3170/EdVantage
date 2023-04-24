module.exports = {
    local: {
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
    }
}
