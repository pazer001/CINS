const UsersModel = require('./UsersModel');

class UsersController {
    setUserSession(req) {
        req.session.userLoggedIn = true;
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

    async postUserTopicsSave(userId, subTopicId) {
        let postUserTopicsSave = await UsersModel.postUserTopicsSave(userId, subTopicId);
        return postUserTopicsSave;
    }

    async deleteUserTopicsSave(userId, subTopicId) {
        let deleteUserTopicsSave = await UsersModel.deleteUserTopicsSave(userId, subTopicId);
        return deleteUserTopicsSave;
    }
}

module.exports = new UsersController();