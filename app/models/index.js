const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.album = require("./album.model.js")(sequelize, Sequelize);
db.artist = require("./artist.model.js")(sequelize, Sequelize);
db.track = require("./track.model.js")(sequelize, Sequelize);

// foreign key for track
db.album.hasMany(db.track, { as: 'track'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.track.belongsTo(db.album, { as: 'album' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for artist
db.album.hasMany(db.artist, { as: 'artist'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.artist.belongsTo(db.album, { as: 'album' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;