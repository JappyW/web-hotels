import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJson from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

console.log('this is the environment: ', env);

const db = {};

let sequelize;
if (config.environment === 'production') {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
            define: {
                timestamps: false

            },
            dialectOption: {
                ssl: true,
                native: true
            },
            logging: false
        }
    );
} else {
    sequelize = new Sequelize(
        config.database, config.username, config.password, config
    );
}

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) &&
            (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
//


sequelize.authenticate().then(() => {
    console.log(`Connection has been established successfully.`);
}).catch(err => console.error(`Unable to connect to the database:`, err));

//STUDIO LINKS
sequelize.models.studios.belongsTo(sequelize.models.users, { foreignKey: "owner_id" });
sequelize.models.studios.belongsTo(sequelize.models.addresses, { foreignKey: "address_id" });
sequelize.models.studios.hasMany(sequelize.models.photo, { foreignKey: "studio_id" });
sequelize.models.studios.hasMany(sequelize.models.rooms, { foreignKey: "studio_id" });
sequelize.models.rooms.belongsTo(sequelize.models.studios, { foreignKey: "studio_id" });

//ROOMS LINKS
sequelize.models.rooms.belongsTo(sequelize.models.room_type, { foreignKey: "room_type_id" });
sequelize.models.rooms.hasMany(sequelize.models.room_comforts, { foreignKey: "room_id" });
sequelize.models.rooms.hasMany(sequelize.models.orders, { foreignKey: "room_id" });
sequelize.models.orders.belongsTo(sequelize.models.rooms, { foreignKey: "room_id" });

//users links
sequelize.models.users.hasMany(sequelize.models.feedbacks, { foreignKey: "user_id" });
sequelize.models.orders.belongsTo (sequelize.models.users, { foreignKey: "user_id" });

//order links
sequelize.models.orders.hasOne(sequelize.models.feedbacks, {foreignKey: "order_id" });
sequelize.models.feedbacks.belongsTo(sequelize.models.orders, {foreignKey: "order_id" });
//other
sequelize.models.room_comforts.belongsTo(sequelize.models.comforts, {foreignKey: "comfort_id"});

db.sequelize = sequelize;

export default db;
