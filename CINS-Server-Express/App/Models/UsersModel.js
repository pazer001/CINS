const pg        =   require('pg');
const config    =   require('../../config.json');
const Logger    =   require('../Utils/Logger');

class TopicsModel {
    constructor() {
        this.pgClient   =   new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
    }
    async postUser(data) {
        var self    =   this;
        data        =   [
            data.FirstName || '',
            data.LastName || '',
            data.Password || '',
            data.EMail || '',
        ];

        return new Promise((resolve, reject) => {
            const query     =   `INSERT INTO "CINS"."Users" ("FirstName", "LastName", "Password", "EMail") VALUES($1, $2, $3, $4)`;
            this.pgClient.query(query, data, async function(err, result) {
                if(err) {Logger.toDB(err, query, JSON.stringify(data)); reject(err)}
                let returnResult    =   {};
                if(result && result.rowCount) {
                    returnResult.data       =   await self.getUser(data);
                    returnResult.code       =   200;
                    returnResult.message    =   'User Added Successfully';
                } else {
                    returnResult.code       =   400;
                    returnResult.message    =   'User Not Added Successfully';
                }
                resolve(returnResult);
            })
        })
    }
    async getUser(data) {
        let self    =   this;
        data        =   [
            data.EMail || '',
            data.Password || ''
        ];

        return new Promise((resolve, reject) => {
            const query     =   `SELECT "Users"."Id", "Users"."FirstName", "Users"."LastName", "Users"."EMail" FROM "CINS"."Users" WHERE "Users"."EMail" = $1 AND "Users"."Password" = $2`;
            this.pgClient.query(query, data, async function(err, result) {
                if(err) {Logger.toDB(err, query, JSON.stringify(data)); reject(err)}
                let returnResult    =   {};
                if(result && result.rowCount) {
                    returnResult.data       =   result.rows.shift();
                    returnResult.subTopicsSaveIds   =   await self.getUserTopicsSave(returnResult.data.Id);
                    returnResult.code       =   200;
                    returnResult.message    =   'User Logged';
                } else {
                    returnResult.code       =   400;
                    returnResult.message    =   'User Not Found';
                }
                resolve(returnResult);
            })
        })
    }
    async postUserTopicsSave(userId, subTopicsId) {
        let data    =   [
            userId,
            subTopicsId
        ];

        return new Promise(resolve => {
            const query     =   `INSERT INTO "CINS"."UserTopicsSave" ("UserId", "SubTopicId") VALUES($1, $2)`;
            this.pgClient.query(query, data, (err, result) => {
                if(err) Logger.toDB(err, query, JSON.stringify(data));
                let returnResult    =   {};
                if(result && result.rowCount) {
                    returnResult.code       =   200;
                    returnResult.message    =   'User Sub Topic Saved Successfully';
                } else {
                    returnResult.code       =   400;
                    returnResult.message    =   'User Sub Topic Not Saved Successfully';
                }
                resolve(returnResult);
            })
        })
    }

    async deleteUserTopicsSave(userId, subTopicsId) {
        let data    =   [
            userId,
            subTopicsId
        ];

        return new Promise(resolve => {
            const query     =   `DELETE FROM "CINS"."UserTopicsSave" WHERE "UserTopicsSave"."UserId" = $1 AND "UserTopicsSave"."SubTopicId" = $2`;
            this.pgClient.query(query, data, (err, result) => {
                if(err) Logger.toDB(err, query, JSON.stringify(data));
                let returnResult    =   {};
                if(result && result.rowCount) {
                    returnResult.code       =   200;
                    returnResult.message    =   'User Sub Topic Deleted Successfully';
                } else {
                    returnResult.code       =   400;
                    returnResult.message    =   'User Sub Topic Not Deleted Successfully';
                }
                resolve(returnResult);
            })
        })
    }

    async getUserTopicsSave(userId) {
        let data    =   [
            userId
        ];

        return new Promise(resolve => {
            const query     =   `SELECT "UserTopicsSave"."SubTopicId" FROM "CINS"."UserTopicsSave" WHERE "UserTopicsSave"."UserId" = $1`;
            this.pgClient.query(query, data, (err, result) => {
                if(err) Logger.toDB(err, query, JSON.stringify(data));
                let returnResult    =   {};
                if(result && result.rowCount) {
                    returnResult.code       =   200;
                    returnResult.data       =   result && result.rows ? result.rows.map(subTopics => subTopics.SubTopicId) : [];
                    returnResult.message    =   'User Sub Topic Found';
                } else {
                    returnResult.code       =   400;
                    returnResult.message    =   'User Sub Topic Not Found';
                }
                resolve(returnResult);
            })
        })
    }
}

module.exports  =   new TopicsModel();