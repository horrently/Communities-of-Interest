var db = require('../config/db.config.js');
var users = db.users; 
var bcrypt = require("bcryptjs");
var globalFunctions = require('../config/global.functions.js');

const interests = db.interests;
const user_interests = db.user_interests;

exports.findAll = (req, res) => {
    users.findAll()
         .then(objects => {
    globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
      globalFunctions.sendError(res, err);
    })
};
 
 exports.create = (req, res) => {
   users.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
   }).then(object => {
       globalFunctions.sendResult(res, object);
   }).catch(err => {
       globalFunctions.sendError(res, err);
   })
 };
 
 exports.update = (req, res) => {
   users.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
       },
       {
           where: {
               id: req.params.id
           }
       }
   ).then(object => {
       globalFunctions.sendResult(res, object);
   }).catch(err => {
       globalFunctions.sendError(res, err);
   })
 };
 
 exports.delete = (req, res) => {
   users.destroy({
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
    users.findByPk(req.params.id, {
      include: [{
        model: user_interests,
        include: [{
          model: interests,
          attributes: ['id', 'name']
        }]
      }]
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: 'Ошибка сервера', error: err.message });
    });
  };