const pg        =   require('pg');
const UserModel =   require('./UsersModel');
const config    =   require('../../config.json');

class TopicsModel {
    constructor() {
        this.pgClient   =   new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
    }
    async getAllTopics() {
        return new Promise(resolve => {
            const query     =   `SELECT 
                                "MainTopics"."Name" AS MainTopics, 
                                "SubTopics"."Id", 
                                "SubTopics"."Name",
                                "SubTopics"."SearchTerm",
                                "SubTopics"."InfoWorld",
                                "SubTopics"."Reddit",
                                "SubTopics"."Infoq",
                                "MainTopics"."Icon"
                            FROM "CINS"."MainTopics"
                            JOIN "CINS"."SubTopics" ON "MainTopics"."Id" = "SubTopics"."MainTopicsId" AND "SubTopics"."Active" = '1';`;
            this.pgClient.query(query, (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async cronSubTopics() {
        return new Promise(resolve => {
            const query     =   `SELECT 
                                "SubTopics"."Id", 
                                "SubTopics"."Name",
                                "SubTopics"."SearchTerm",
                                "SubTopics"."InfoWorld",
                                "SubTopics"."Reddit",
                                "SubTopics"."Infoq",
                                "SubTopics"."Medium"
                            FROM "CINS"."SubTopics"
                            WHERE "SubTopics"."Active" = '1';`;
            this.pgClient.query(query, (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }
}

module.exports  =   new TopicsModel();