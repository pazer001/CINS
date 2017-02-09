const pg        =   require('pg');
const UserModel =   require('../Models/UsersModel');
const config    =   require('../config.json');

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
                                "SubTopics"."SearchTerm"
                            FROM "CINS"."MainTopics"
                            LEFT JOIN "CINS"."SubTopics" ON "MainTopics"."Id" = "SubTopics"."MainTopicsId";`;
            this.pgClient.query(query, (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }

    async getMedia(Id) {
        return new Promise(resolve => {
            const query     = `SELECT 
                                    "Media"."PublishedAt", 
                                    "Media"."Title", 
                                    "Media"."Description", 
                                    "Media"."Source" AS "Source", 
                                    "Media"."Url",
                                    COALESCE(NULLIF("Media"."ImageUrl", ''), "Sources"."ImageUrl") AS "ImageUrl", 
                                    "Media"."Type"
                              FROM "CINS"."Media" 
                              LEFT JOIN "CINS"."Sources" ON "Media"."Source" = "Sources"."Name"
                              WHERE "Media"."SubTopicsId" = $1
                              ORDER BY "Media"."PublishedAt" DESC`;
            this.pgClient.query(query, [Id], (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }

    async getLatestMedia(userId) {
        let userTopicsSave  =   await UserModel.getUserTopicsSave(userId),
            userTopicsSaveIds   =   userTopicsSave.data || [];
        return new Promise(resolve => {
            const query     =   `SELECT 
                                    "Media"."PublishedAt", 
                                    "Media"."Title", 
                                    "Media"."Description", 
                                    "Media"."Source" AS "Source", 
                                    "Media"."Url",
                                    COALESCE(NULLIF("Media"."ImageUrl", ''), "Sources"."ImageUrl") AS "ImageUrl", 
                                    "Media"."Type"
                              FROM "CINS"."Media" 
                              LEFT JOIN "CINS"."Sources" ON "Media"."Source" = "Sources"."Name"
                               ${userTopicsSaveIds.length ? `WHERE "Media"."SubTopicsId" IN(${userTopicsSaveIds.join(',')})` : ``} 
                              ORDER BY "Media"."PublishedAt" DESC
                              LIMIT 100`;
            this.pgClient.query(query, (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }
}

module.exports  =   new TopicsModel();