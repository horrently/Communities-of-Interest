const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('community_interests', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'communities',
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
