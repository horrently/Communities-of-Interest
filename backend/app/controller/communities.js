var db = require('../config/db.config.js');
var communities = db.communities; 
var users = db.users; 
var community_interests = db.community_interests;
var interests = db.interests;
var user_interests = db.user_interests;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    communities.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    communities.create({
        title: req.body.title,
        description: req.body.description,
        owner_id: req.body.owner_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    communities.update({
        title: req.body.title,
        description: req.body.description
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
    communities.destroy({
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
    communities.findByPk(req.params.id, {
        include: [{
            model: community_interests,
            include: [{
                model: interests
            }]
        }]
    })
    .then(object => {
        if (object) {
            const communityData = {
                id: object.id,
                title: object.title,
                description: object.description,
                interests: object.community_interests.map(ci => ({
                    id: ci.interest.id,
                    name: ci.interest.name
                })),
                members: object.members
            };
            globalFunctions.sendResult(res, communityData);
        } else {
            globalFunctions.sendError(res, { message: 'Сообщество не найдено' });
        }
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.findFilteredCommunities = (req, res) => {
    const userId = req.params.user_id;
    // интересы пользователя
    user_interests.findAll({
      where: { user_id: userId },
      attributes: ['interest_id']
    })
    .then(userInterests => {
      const interestIds = userInterests.map(ui => ui.interest_id);
      // у пользователя нет интересов, отображаются все сообщества
      if (interestIds.length === 0) {
        communities.findAll()
          .then(allCommunities => {
            res.send(allCommunities);
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        // сообщества, у которых есть хотя бы один интерес из списка интересов пользователя
        communities.findAll({
          include: [{
            model: community_interests,
            where: {
              interest_id: interestIds
            }
          }]
        })
        .then(filteredCommunities => {
          res.send(filteredCommunities);
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  };