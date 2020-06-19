/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fullname: {
            type: DataTypes.STRING,
            field: "full_name",
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "$2y$10$v.nPc6.8p9bAIPto6WTh1erxzc8z/BS.3QRqpVHULiKUZ.HCIEapG"
        },
        role: {
            type: DataTypes.ENUM("ADMIN", "OWNER", "USER"),
            allowNull: false,
            defaultValue: "USER"
        },
        activated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        banned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        authType: {
            type: DataTypes.ENUM("local","google","facebook"),
            allowNull: false,
        },
        authToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileImage: {
            type: DataTypes.STRING,
            field: "profile_image",
            allowNull: true
        }
    },
    {
        tableName: 'users'
    });
    return Users;
};
