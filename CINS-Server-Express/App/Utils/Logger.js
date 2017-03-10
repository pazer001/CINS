const pg            =   require('pg');
const DB            =   require('./DB');
const config        =   require('../../config.json');
class Logger {
    async toDB(error = '', query = '', data = '') {
        const queryString     =   `INSERT INTO "CINS"."Logger" ("Error", "Query", "Data") VALUES($1, $2, $3)`;
        try {
            await DB.query(queryString, [error, query, data]);
        } catch(e) {
            console.log(e, queryString, [error, query, data])
        }
    }
}

module.exports  =   new Logger();