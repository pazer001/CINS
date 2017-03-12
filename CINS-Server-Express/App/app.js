const express           =   require('express');
const bodyParser        =   require('body-parser');
const session           =   require('express-session');
const cookieParser      =   require('cookie-parser');
const TopicsController  =   require('./Controllers/TopicsController');
const UsersController   =   require('./Controllers/UsersController');
const MediaController   =   require('./Controllers/MediaController');
const config            =   require('./../config.json');

const app       = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'mU4TFfKQ',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(cookieParser());

app.get('/', function (req, res) {
    res.send('CINS!')
});

app.get('/allTopics', async function (req, res) {
    let getAllTopics    =   await TopicsController.getAllTopics();
    res.json(getAllTopics)
});

app.get('/getMedia/:Id', async function (req, res) {
    let getMedia    =   await MediaController.getMedia(req.params.Id);
    res.json(getMedia)
});

app.get('/getLatestMedia/:userId', async function (req, res) {
    let getLatestMedia    =   await MediaController.getLatestMedia(req.params.userId);
    res.json(getLatestMedia);
});

app.get('/rss/:userId', async function (req, res) {
    let rss    =   await MediaController.rss(req.params.userId);
    res.set('Content-Type', 'application/rss+xml');
    res.send(rss);
});

app.post('/user', async function (req, res) {
    let postUser    =   await UsersController.postUser(req.body.firstName, req.body.lastName, req.body.password, req.body.eMail);
    UsersController.setUserSession(req, postUser.data.data.Id);
    UsersController.setUserCookie(res, postUser.data.data.Id);
    res.json(postUser);
});

app.get('/user', async function (req, res) {
    try {
        let getUser    =   await UsersController.getUser(req.query.EMail, req.query.Password);
        if(getUser && getUser.code === 200) {
            UsersController.setUserSession(req, getUser.data.Id);
            UsersController.setUserCookie(res, getUser.data.Id);
            res.json(getUser)
        } else {
            res.json({problem: 'Problem Occurred! Get Out Of HERE!!! '})
        }

    } catch (e) {
        console.log(e)
    }

});

app.post('/userLogout', async function (req, res) {
    let logout    =   await UsersController.logoutUser(req, res);
    res.json(logout)
});

app.post('/userTopicsSave/:userId/:subTopicId', async function (req, res) {
    let postUserTopicsSave    =   await UsersController.postUserTopicsSave(req.params.userId, req.params.subTopicId, req);
    res.json(postUserTopicsSave)
});

app.delete('/userTopicsSave/:userId/:subTopicId', async function (req, res) {
    let postUserTopicsSave    =   await UsersController.deleteUserTopicsSave(req.params.userId, req.params.subTopicId, req);
    res.json(postUserTopicsSave)
});

app.post('/rateMedia/:mediaId', async function (req, res) {
    let rateMedia    =   await MediaController.rateMedia(req, req.params.mediaId);
    res.json(rateMedia)
});

app.get('/search/:term', async function (req, res) {
    let search    =   await MediaController.search(req.params.term);
    res.json(search);
});

app.post('/requestMedia', async function (req, res) {
    let data    =   [
        req.body.title,
        req.body.description,
        req.body.source,
        req.body.url,
        req.body.subTopicId,
        req.body.type,
    ];
    let rateMedia    =   await MediaController.requestMedia(data);
    res.json(rateMedia)
});

app.post('/userMediaSave/:userId/:mediaId', async function (req, res) {
    let postUserMediaSave    =   await UsersController.postUserMediaSave(req.params.userId, req.params.mediaId, req);
    res.json(postUserMediaSave)
});

app.delete('/userMediaSave/:userId/:mediaId', async function (req, res) {
    let deleteUserMediaSave    =   await UsersController.deleteUserMediaSave(req.params.userId, req.params.mediaId, req);
    res.json(deleteUserMediaSave)
});

app.get('/savedMedia/:userId', async function (req, res) {
    let savedMedia    =   await UsersController.savedMedia(req.params.userId, req);
    res.json(savedMedia)
});

app.delete('/allUserTopicsSave/:userId', async function (req, res) {
    let deleteAllUserTopicsSave    =   await UsersController.deleteAllUserTopicsSave(req.params.userId, req);
    res.json(deleteAllUserTopicsSave)
});

app.post('/keepAlive/:userId', async function (req, res) {
    UsersController.setUserSession(req, req.params.userId);
    UsersController.setUserCookie(res, req.params.userId);
    res.json({code: 200});
});


app.listen(config[process.env.NODE_ENV].Servers.Backend.Port, () => console.log(`Server ${process.env.NODE_ENV} on port: ${config[process.env.NODE_ENV].Servers.Backend.Port}`));