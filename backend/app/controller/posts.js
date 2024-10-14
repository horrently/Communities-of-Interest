var db = require('../config/db.config.js');
var posts = db.posts; 
var communities = db.communities;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    posts.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    posts.create({
        content: req.body.content,
        community_id: req.body.community_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.update = (req, res) => {
    posts.update({
        content: req.body.content,
        approved: req.body.approved
    }, {
        where: {
            id: req.params.id
        }
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    posts.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    posts.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findByCommunityId = (req, res) => {
    const communityId = req.params.community_id;
    posts.findAll({
        where: { community_id: communityId } // все посты
    })
    .then(posts => {
        globalFunctions.sendResult(res, posts);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};

