const pg            =   require('pg');
const elasticsearch =   require('elasticsearch');
const Logger        =   require('./Logger');
const config        =   require('../../config.json');

class DB {
    constructor() {
        this.pgClient   = new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
        this.ESclient = new elasticsearch.Client({
            host: `${config[process.env.NODE_ENV].Elasticsearch.Server}:${config[process.env.NODE_ENV].Elasticsearch.Port}`,
            // log: 'trace'
        });
    }

    async query(query, data = null) {
        return new Promise((resolve, reject) => {
            this.pgClient.query(query, data, (error, result) => {
                if(error) {
                    Logger.toDB(JSON.stringify(error), query, JSON.stringify(data));
                    reject(error);
                };
                resolve(result);
            })
        })
    }

    async ESquery(index, id, body) {
        return new Promise(resolve => {
            this.ESclient.create({
                index: index,
                type: 'JSON',
                id: id,
                body: body
            }, (error, response) => {
                if(error) console.log(error, index, id, body);
                resolve(response);
            })
        })

    }
}

module.exports  =   new DB();