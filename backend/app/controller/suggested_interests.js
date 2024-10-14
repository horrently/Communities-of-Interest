const Sequelize = require('sequelize');
var db = require('../config/db.config.js');
var suggested_interests = db.suggested_interests; 
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    suggested_interests.findAll({
        where: { approved: false } // Получаем только не одобренные интересы
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.create = (req, res) => {
    suggested_interests.create({
        name: req.body.name,
        user_id: req.body.user_id,
        approved: false
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.approve = (req, res) => {
    suggested_interests.findByPk(req.params.id)
        .then(suggestion => {
            if (suggestion) {
                db.interests.create({ name: suggestion.name })
                    .then(interest => {
                        suggestion.destroy(); // Удаляем предложение
                        globalFunctions.sendResult(res, interest);
                    });
            } else {
                globalFunctions.sendError(res, 'Предложение не найдено');
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.reject = (req, res) => {
    suggested_interests.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись отклонена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
