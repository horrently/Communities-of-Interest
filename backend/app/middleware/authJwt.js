var jwt = require("jsonwebtoken");
var config = require("../config/auth.config.js");

// Middleware для проверки токена
exports.verifyToken = (req, res, next) => {
    // считываем токен из заголовков
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Неверно введенный токен"
            });
            return;
        }
        req.userId = decoded.id; // сохраняем ID пользователя в запросе
        next();
    });
};
