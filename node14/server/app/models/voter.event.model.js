module.exports = (sequelize, Sequelize) => {
    const VoterEvent = sequelize.define("voter_event", {

        idUserEvent: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true,
            // will result in an attribute that is idUserEvent when user facing but id_user_event in the database
            field: 'id_user_event'
        },
        idUser: {
            type: Sequelize.INTEGER,
            field: 'id_user'
        },
        idEvent: {
            type: Sequelize.INTEGER,
            field: 'id_event'
        }
        
    }, {
        // model tableName will be the same as the model name
        freezeTableName: true
      });
  
    return VoterEvent;
  };
