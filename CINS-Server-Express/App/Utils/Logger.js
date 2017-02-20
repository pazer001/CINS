const pg            =   require('pg');
const config        =   require('../../config.json');
class Logger {
    constructor() {
        this.pgClient   =   new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
    }

    toDB(error = '', query = '', data = '') {
        const queryString     =   `INSERT INTO "CINS"."Logger" ("Error", "Query", "Data") VALUES($1, $2, $3)`;
        console.log(error, query, data);
        this.pgClient.query(queryString, [error, query, data]);
    }
}

module.exports  =   new Logger();