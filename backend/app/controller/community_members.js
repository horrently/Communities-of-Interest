var db = require('../config/db.config.js');
var community_members = db.community_members;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    community_members.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    community_members.create({
        user_id: req.body.user_id,
        community_id: req.body.community_id,
        role: req.body.role
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    community_members.destroy({
        where: {
            user_id: req.params.user_id,
            community_id: req.params.community_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
