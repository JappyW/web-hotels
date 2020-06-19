import {STUDIO_STATUS} from '../../constants/EnumForStudioStatus';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "studios",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },

      starRating: {
        type: DataTypes.INTEGER,
        field: "star_rating",
        allowNull: true
      },
      reviewsRating: {
        type: DataTypes.DOUBLE,
        field: "reviews_rating",
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM(
          STUDIO_STATUS.ACTIVATED,
          STUDIO_STATUS.INACTIVE,
          STUDIO_STATUS.REJECT,
          STUDIO_STATUS.WAITING_FOR_APPROVAL
        ),
        allowNull: false,
        defaultValue: STUDIO_STATUS.INACTIVE
      },
      ownerId: {
        type: DataTypes.INTEGER,
        field: "owner_id",
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      addressId: {
        type: DataTypes.INTEGER,
        field: "address_id",
        allowNull: false,
        references: {
          model: "addresses",
          key: "id"
        }
      },
      bankAccount: {
        type: DataTypes.STRING,
        field: "bank_account",
        allowNull: false,
        defaultValue: "4731195301524633"
      }
    },
    {
      tableName: "studios"
    }
  );
};
