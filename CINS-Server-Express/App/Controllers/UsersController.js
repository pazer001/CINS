const Logger        =   require('../Utils/Logger');
const UsersModel    =   require('../Models/UsersModel');

class UsersController {
    setUserSession(req, userId) {
        req.session.userLoggedIn    = true;
        req.session.userId          = userId;
    }

    setUserCookie(res, userId) {
        res.cookie('userLoggedIn', userId, {expires: new Date(Date.now() + 60 * 60 * 24 * 14 * 1000)});
    }

    logoutUser(req, res) {
        req.session.userLoggedIn = false;
        res.clearCookie("userLoggedIn");

        let returnData = {
            code: 200,
            message: `User Logged Out Successfully`
        };

        return returnData;
    }

    async postUser(firstName, lastName, password, eMail) {
        let postUser;
        try {
            let data        =   [
                firstName  || '',
                lastName   || '',
                password   || '',
                eMail      || '',
            ];
            postUser = await UsersModel.postUser(firstName, lastName, password, eMail);
            let postUserResult    =   {};
            if(postUser && postUser.rowCount) {
                postUserResult.data       =   await UsersModel.getUser(data);
                postUserResult.code       =   200;
                postUserResult.message    =   'User Added Successfully';
            } else {
                postUserResult.code       =   400;
                postUserResult.message    =   'User Not Added Successfully';
            }
            return postUserResult;
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }

    async getUser(eMail, password) {
        try {
            let getUser = await UsersModel.getUser(eMail, password);
            let getUserResult                           =   {};
            if(getUser && getUser.rowCount) {
                getUserResult.data                      =   getUser.rows.shift();
                getUserResult.subTopicsSaveIds          =   await UsersModel.getUserTopicsSave(getUserResult.data.Id);
                getUserResult.code                      =   200;
                getUserResult.message                   =   'User Logged';
            } else {
                getUserResult.code                      =   400;
                getUserResult.message                   =   'User Not Found';
                getUserResult.data                      =   [];
                getUserResult.subTopicsSaveIds          =   {};
                getUserResult.subTopicsSaveIds.data     =   [];
            }
            return getUserResult;
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }

    async postUserTopicsSave(userId, subTopicId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        try {
            let postUserTopicsSave = await UsersModel.postUserTopicsSave(userId, subTopicId);
            let postUserTopicsSaveResult            =   {};
            if(postUserTopicsSave && postUserTopicsSave.rowCount) {
                postUserTopicsSaveResult.code       =   200;
                postUserTopicsSaveResult.message    =   'User Sub Topic Saved Successfully';
            } else {
                postUserTopicsSaveResult.code       =   400;
                postUserTopicsSaveResult.message    =   'User Sub Topic Not Saved Successfully';
            }
            return postUserTopicsSaveResult;
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }


    }

    async deleteUserTopicsSave(userId, subTopicId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        try {
            let deleteUserTopicsSave = await UsersModel.deleteUserTopicsSave(userId, subTopicId);
            let deleteUserTopicsSaveResult          =   {};
            if(deleteUserTopicsSave && deleteUserTopicsSave.rowCount) {
                deleteUserTopicsSaveResult.code     =   200;
                deleteUserTopicsSaveResult.message  =   'User Sub Topic Deleted Successfully';
            } else {
                deleteUserTopicsSaveResult.code     =   400;
                deleteUserTopicsSaveResult.message  =   'User Sub Topic Not Deleted Successfully';
            }
            return deleteUserTopicsSaveResult;
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }

    async postUserMediaSave(userId, mediaId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        try {
            let postUserMediaSave    =  await UsersModel.postUserMediaSave(userId, mediaId);

            if(postUserMediaSave && postUserMediaSave.rowCount) {
                return {
                    code: 200,
                    message: 'Media Saved Succesfully'
                };
            } else {
                return {
                    code: 400,
                    message: 'Media Not Saved Succesfully'
                };
            }
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }

    }

    async deleteUserMediaSave(userId, mediaId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        try {
            let deleteUserMediaSave = await UsersModel.deleteUserMediaSave(userId, mediaId);

            if (deleteUserMediaSave && deleteUserMediaSave.rowCount) {
                return {
                    code: 200,
                    message: 'Media Deleted Succesfully'
                };
            } else {
                return {
                    code: 400,
                    message: 'Media Not Deleted Succesfully'
                };
            }
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }

    async savedMedia(userId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        try {
            let postUserMediaSave = await UsersModel.savedMedia(userId);

            if (postUserMediaSave && postUserMediaSave.rowCount) {
                return {
                    code: 200,
                    data: postUserMediaSave.rows
                };
            } else {
                return {
                    code: 400
                };
            }
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }

    async deleteAllUserTopicsSave(userId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        try {
            let deleteAllUserTopicsSave = await UsersModel.deleteAllUserTopicsSave(userId);

            if (deleteAllUserTopicsSave && deleteAllUserTopicsSave.rowCount) {
                return {
                    code: 200,
                    message: 'All Saved Topics Deleted'
                };
            } else {
                return {
                    code: 400,
                    message: 'Error Occurred'
                };
            }
        } catch (e) {
            Logger.toDB(JSON.stringify(e));
        }
    }
}

module.exports = new UsersController();