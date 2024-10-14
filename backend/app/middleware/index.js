var authJwt = require("./authJwt");
var verifySignUp = require("./verifySignUp");

// Экспортируем функции для использования в маршрутах
module.exports = {
    authJwt,
    verifySignUp
};
