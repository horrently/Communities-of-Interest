var db = require('../config/db.config.js');
var community_interests = db.community_interests;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    community_interests.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    community_interests.create({
        community_id: req.body.community_id,
        interest_id: req.body.interest_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    community_interests.destroy({
        where: {
            community_id: req.params.community_id,
            interest_id: req.params.interest_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};