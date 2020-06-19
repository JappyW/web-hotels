/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedbacks', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'feedbacks'
  });
};
