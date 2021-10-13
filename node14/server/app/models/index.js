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
  },

  define: {
    // true by default
    timestamps: false
  }

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// append the new models
db.candidates = require("./candidate.model.js")(sequelize, Sequelize);
db.events = require("./event.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.candidate_event = require("./candidate.event.model.js")(sequelize, Sequelize);
db.voter_event = require("./voter.event.model.js")(sequelize, Sequelize);
db.votes = require("./vote.model.js")(sequelize, Sequelize);

// building associations with tables
db.candidates.hasMany(db.candidate_event, {foreignKey: 'id_candidate', allowNull: false})
db.events.hasMany(db.candidate_event, {foreignKey: 'id_event', allowNull: false})

// // permissions
db.candidate_event.belongsTo(db.candidates, {foreignKey: 'id_candidate', allowNull: false})
db.candidate_event.belongsTo(db.events, {foreignKey: 'id_event', allowNull: false})

module.exports = db;
