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
    resave: true,
    saveUninitialized: true,
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: new Date(Date.now() + (30 * 86400 * 1000)),
    activeDuration: 5 * 60 * 1000,
}));

app.use(cookieParser());

app.get('/', function (req, res) {
    res.send('CINS!')
});

app.get('/getAllTopics', async function (req, res) {
    let getAllTopics    =   await TopicsController.getAllTopics();
    res.json(getAllTopics)
});

app.get('/getMedia/:Id', async function (req, res) {
    let getMedia    =   await TopicsController.getMedia(req.params.Id);
    res.json(getMedia)
});

app.get('/getLatestMedia/:userId', async function (req, res) {
    let getLatestMedia    =   await TopicsController.getLatestMedia(req.params.userId);
    res.json(getLatestMedia);
});

app.post('/user', async function (req, res) {
    let postUser    =   await UsersController.postUser(req.body);
    UsersController.setUserSession(req);
    UsersController.setUserCookie(res, postUser.data.data.Id);
    res.json(postUser);
});

app.get('/user', async function (req, res) {
    console.log(req.query)
    let getUser    =   await UsersController.getUser(req.query);
    if(getUser.code === 200) {
        UsersController.setUserSession(req);
        UsersController.setUserCookie(res, getUser.data.Id);
    }
    res.json(getUser)
});

app.post('/userLogout', async function (req, res) {
    let logout    =   await UsersController.logoutUser(req, res);
    res.json(logout)
});

app.post('/userTopicsSave/:userId/:subTopicId', async function (req, res) {
    let postUserTopicsSave    =   await UsersController.postUserTopicsSave(req.params.userId, req.params.subTopicId);
    res.json(postUserTopicsSave)
});

app.delete('/userTopicsSave/:userId/:subTopicId', async function (req, res) {
    let postUserTopicsSave    =   await UsersController.deleteUserTopicsSave(req.params.userId, req.params.subTopicId);
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


app.listen(config[process.env.NODE_ENV].Servers.Backend.Port, () => console.log(`Server ${process.env.NODE_ENV} on port: ${config[process.env.NODE_ENV].Servers.Backend.Port}`));