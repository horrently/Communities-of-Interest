var db = require('../config/db.config.js');
var User = db.users;

// Проверка дубликата email при регистрации
exports.checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email // проверьте наличие email
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: "Пользователь с данным email уже существует"
            });
        }
        // если email не занят, продолжаем
        next();
    });
};
