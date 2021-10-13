module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define("vote", {
        idVote: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true,
            // will result in an attribute that is idUser when user facing but id_user in the database
            field: 'id_vote'
        },
        idVoter: {
            type: Sequelize.STRING,
            field: 'id_voter'
        },
        publicVote: {
            type: Sequelize.STRING,
            field: 'public_vote'
        },
        idCandidate: {
            type: Sequelize.STRING,
            field: 'id_candidate'
        },
        idEvent: {
            type: Sequelize.STRING,
            field: 'id_event'
        },
        dateCreation: {
            type: Sequelize.DATE,
            field: 'date_creation'
        }

    }, {
        // model tableName will be the same as the model name
        freezeTableName: true
      });

    return Vote;
  };
