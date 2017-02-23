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
                                "SubTopics"."SearchTerm"
                            FROM "CINS"."MainTopics"
                            JOIN "CINS"."SubTopics" ON "MainTopics"."Id" = "SubTopics"."MainTopicsId" AND "SubTopics"."Active" = 't';`;
            this.pgClient.query(query, (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }

    async getMedia(Id) {
        return new Promise(resolve => {
            const query     = `SELECT 
                                    "Media"."Id",
                                    DATE("Media"."PublishedAt") AS "PublishedAt",
                                    "Media"."Title", 
                                    "Media"."Description", 
                                    "Media"."Source" AS "Source", 
                                    "Media"."Url",
                                    COALESCE(NULLIF("Media"."ImageUrl", ''), "Sources"."ImageUrl") AS "ImageUrl", 
                                    "Media"."Type",
                                    "SubTopics"."Name" AS "SubTopicName"
                              FROM "CINS"."Media" 
                              LEFT JOIN "CINS"."Sources" ON "Media"."Source" = "Sources"."Name"
                              LEFT JOIN "CINS"."MediaRating" ON "Media"."Id" = "MediaRating"."MediaId"
                              LEFT JOIN "CINS"."SubTopics" ON "Media"."SubTopicsId" = "SubTopics"."Id"
                              WHERE "Media"."SubTopicsId" = $1
                              ORDER BY "Media"."PublishedAt" DESC
                              LIMIT 100`;
            this.pgClient.query(query, [Id], (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }

    async getLatestMedia(userId) {
        let userTopicsSave      =   await UserModel.getUserTopicsSave(userId),
            userTopicsSaveIds   =   userTopicsSave.data || [];
        return new Promise(resolve => {
            const query     =   `SELECT
                                    "Media"."Id",
                                    DATE("Media"."PublishedAt") AS "PublishedAt",
                                    "Media"."Title",
                                    "Media"."Description",
                                    "Media"."Source" AS "Source",
                                    "Media"."Url",
                                    "MediaRating"."RatingCount" AS "RatingCount",
                                    COALESCE (NULLIF ("Media"."ImageUrl", ''),"Sources"."ImageUrl") AS "ImageUrl",
                                    "Media"."Type",
                                    "SubTopics"."Name" AS "SubTopicName"
                                FROM
                                    "CINS"."Media"
                                LEFT JOIN "CINS"."Sources" ON "Media"."Source" = "Sources"."Name"
                                LEFT JOIN "CINS"."MediaRating" ON "Media"."Id" = "MediaRating"."MediaId"
                                LEFT JOIN "CINS"."SubTopics" ON "Media"."SubTopicsId" = "SubTopics"."Id"
                                ${userTopicsSaveIds.length ? `WHERE "Media"."SubTopicsId" IN(${userTopicsSaveIds.join(',')})` : ``}
                                ORDER BY DATE("Media"."PublishedAt") DESC, "MediaRating"."RatingCount" DESC
                                LIMIT 100`;
            this.pgClient.query(query, (err, result) => {
                if(err) console.log(err);
                resolve(result);
            })
        })
    }
}

module.exports  =   new TopicsModel();