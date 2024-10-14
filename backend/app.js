var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных
db.sequelize.sync({force: false}); // автоматическое создание таблиц в БД

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.listen(3000);

var auth = require('./app/route/auth.js');
var communities = require('./app/route/communities');
var community_interests = require('./app/route/community_interests');
var community_members = require('./app/route/community_members');
var interests = require('./app/route/interests');
var posts = require('./app/route/posts');
var suggested_interests = require('./app/route/suggested_interests');
var user_interests = require('./app/route/user_interests');
var users = require('./app/route/users');

auth(app);
communities(app);
community_interests(app);
community_members(app);
interests(app);
posts(app);
suggested_interests(app);
user_interests(app);
users(app);