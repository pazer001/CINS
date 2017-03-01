const UsersModel = require('../Models/UsersModel');

class UsersController {
    setUserSession(req, userId) {
        req.session.userLoggedIn = true;
        req.session.userId = userId;
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
        }

        return returnData;
    }

    async postUser(data) {
        let postUser;
        try {
            postUser = await UsersModel.postUser(data);
        } catch (e) {

        }
        return postUser;
    }

    async getUser(data) {
        let getUser;
        try {
            getUser = await UsersModel.getUser(data);
        } catch (e) {

        }
        return getUser;
    }

    async postUserTopicsSave(userId, subTopicId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        let postUserTopicsSave = await UsersModel.postUserTopicsSave(userId, subTopicId);
        return postUserTopicsSave;
    }

    async deleteUserTopicsSave(userId, subTopicId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        let deleteUserTopicsSave = await UsersModel.deleteUserTopicsSave(userId, subTopicId);
        return deleteUserTopicsSave;
    }

    async postUserMediaSave(userId, mediaId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
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
    }

    async deleteUserMediaSave(userId, mediaId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        let deleteUserMediaSave    =  await UsersModel.deleteUserMediaSave(userId, mediaId);

        if(deleteUserMediaSave && deleteUserMediaSave.rowCount) {
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
    }

    async savedMedia(userId, req) {
        if(req.session.userId !== userId) return {code: 401, message: 'Unauthorized!'};
        let postUserMediaSave    =  await UsersModel.savedMedia(userId);

        if(postUserMediaSave && postUserMediaSave.rowCount) {
            return {
                code: 200,
                data: postUserMediaSave.rows
            };
        } else {
            return {
                code: 400
            };
        }
    }
}

module.exports = new UsersController();