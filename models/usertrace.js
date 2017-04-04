'use strict';
module.exports = function(sequelize, DataTypes) {
  const UserTrace = sequelize.define(
    'UserTrace',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      desc: {
        type: DataTypes.STRING,
      },
    },
    {
      classMethods: {
        associate: function(models) {
          UserTrace.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false,
            },
          });
        }
      }
    }
  );
  return UserTrace;
};
