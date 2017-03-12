const pg        =   require('pg');
const DB        =   require('../Utils/DB');
const config    =   require('../../config.json');
const UserModel =   require('./UsersModel');

class MediaModel {
    constructor() {
        this.pgClient = new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
    }

    async rateMedia(mediaId) {
        let data    =   [mediaId];
        return new Promise(resolve => {
            const query = `INSERT INTO "CINS"."MediaRating" ("RatedAt", "RatingCount", "MediaId") VALUES (now(), 1, $1)
                            ON CONFLICT ("MediaId") DO UPDATE
                            SET "RatingCount" = "MediaRating"."RatingCount" + 1`;
            this.pgClient.query(query, data, (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }

    ratedMediaCount(mediaId) {
        let data    =   [mediaId];
        return new Promise(resolve => {
            const query = `SELECT "MediaRating"."RatingCount" FROM "CINS"."MediaRating" WHERE "MediaRating"."MediaId" = $1`;
            this.pgClient.query(query, data, (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }

    //From Elasticsearch
    search(term) {
        return new Promise(resolve => {
            DB.ESclient.search({
                index: 'media',
                sort: 'PublishedAt:desc',
                requestCache: true,
                trackScores: false,
                body: {
                    query: {
                        multi_match: {
                            query: term,
                            fields: ['Description', 'Title']
                        }
                    }
                }
            }, (error, response) => {
                if (error) throw error;
                let results =   [];
                if(response.hits.hits.length) {
                    for(let i in response.hits.hits) {
                        results.push(response.hits.hits[i]._source)
                    }
                }
                resolve(results);
            });
        });
    }

    requestMedia(data) {
        return new Promise(resolve => {
            const query = `INSERT INTO "CINS"."RequestMedia" 
                            ("PublishedAt", "Title", "Description", "Source", "Url", "SubTopicsId", "Type") 
                            VALUES(now(), $1, $2, $3, $4, $5, $6)
                            ON CONFLICT ("Url") DO NOTHING`;
            this.pgClient.query(query, data, (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        })
    }

    // Media for specific topic
    async getMedia(Id) {
        return new Promise(resolve => {
            const query     = `SELECT 
                                    "Media"."Id",
                                    DATE("Media"."PublishedAt") AS "PublishedAt",
                                    "Media"."Title", 
                                    "Media"."Description", 
                                    "Media"."Source" AS "Source", 
                                    "Media"."Url", 
                                    "Media"."Type",
                                    "SubTopics"."Name" AS "SubTopicName"
                              FROM "CINS"."Media" 
                              LEFT JOIN "CINS"."MediaRating" ON "Media"."Id" = "MediaRating"."MediaId"
                              LEFT JOIN "CINS"."SubTopics" ON "Media"."SubTopicsId" = "SubTopics"."Id"
                              WHERE "Media"."SubTopicsId" = $1
                              ORDER BY "Media"."PublishedAt" DESC
                              LIMIT 100`;
            this.pgClient.query(query, [Id], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    // General latest media of user latest media
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
                                    "Media"."Type",
                                    "SubTopics"."Name" AS "SubTopicName"
                                FROM
                                    "CINS"."Media"
                                LEFT JOIN "CINS"."MediaRating" ON "Media"."Id" = "MediaRating"."MediaId"
                                LEFT JOIN "CINS"."SubTopics" ON "Media"."SubTopicsId" = "SubTopics"."Id"
                                ${userTopicsSaveIds.length ? `WHERE "Media"."SubTopicsId" IN(${userTopicsSaveIds.join(',')})` : ``}
                                ORDER BY DATE("Media"."PublishedAt") DESC, "MediaRating"."RatingCount" DESC, "Media"."PublishedAt" DESC
                                LIMIT 100`;
            this.pgClient.query(query, (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }
}

module.exports = new MediaModel();