var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _interests = require("./interests");
var _user_interests = require("./user_interests");
var _communities = require("./communities");
var _community_interests = require("./community_interests");
var _community_members = require("./community_members");
var _posts = require("./posts");
var _suggested_interests = require("./suggested_interests");

function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);
  var interests = _interests(sequelize, DataTypes);
  var user_interests = _user_interests(sequelize, DataTypes);
  var communities = _communities(sequelize, DataTypes);
  var community_interests = _community_interests(sequelize, DataTypes);
  var community_members = _community_members(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var suggested_interests = _suggested_interests(sequelize, DataTypes);

  user_interests.belongsTo(users, { foreignKey: "user_id" });
  users.hasMany(user_interests, { foreignKey: "user_id", onDelete: "CASCADE" });
  user_interests.belongsTo(interests, { foreignKey: "interest_id" });
  interests.hasMany(user_interests, { foreignKey: "interest_id", onDelete: "CASCADE" });

  community_interests.belongsTo(communities, { foreignKey: "community_id" });
  communities.hasMany(community_interests, { foreignKey: "community_id", onDelete: "CASCADE" });
  community_interests.belongsTo(interests, { foreignKey: "interest_id" });
  interests.hasMany(community_interests, { foreignKey: "interest_id", onDelete: "CASCADE" });

  community_members.belongsTo(users, { foreignKey: "user_id" });
  users.hasMany(community_members, { foreignKey: "user_id", onDelete: "CASCADE" });
  community_members.belongsTo(communities, { foreignKey: "community_id" });
  communities.hasMany(community_members, { foreignKey: "community_id", onDelete: "CASCADE" });

  posts.belongsTo(communities, { foreignKey: "community_id" });
  communities.hasMany(posts, { foreignKey: "community_id", onDelete: "CASCADE" });

  suggested_interests.belongsTo(users, { foreignKey: "user_id" });
  users.hasMany(suggested_interests, { foreignKey: "user_id", onDelete: "CASCADE" });

  communities.belongsTo(users, { foreignKey: "owner_id" });
  users.hasMany(communities, { foreignKey: "owner_id", onDelete: "CASCADE" });

  return {
    users,
    interests,
    user_interests,
    communities,
    community_interests,
    community_members,
    posts,
    suggested_interests,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
