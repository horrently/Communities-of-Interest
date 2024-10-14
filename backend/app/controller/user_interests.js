var db = require('../config/db.config.js');
var user_interests = db.user_interests; 
var users = db.users; 
var interests = db.interests; 
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    user_interests.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    user_interests.create({
        user_id: req.body.user_id,
        interest_id: req.body.interest_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    user_interests.destroy({
        where: {
            user_id: req.params.user_id,
            interest_id: req.params.interest_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};