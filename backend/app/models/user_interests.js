const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_interests', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    interest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'interests',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  });
};
