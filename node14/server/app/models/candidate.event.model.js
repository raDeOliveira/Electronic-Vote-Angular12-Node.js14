module.exports = (sequelize, Sequelize) => {
    const CandidateEvent = sequelize.define("candidate_event", {

        idCandidateEvent: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true,
            // will result in an attribute that is idCandidateEvent when user facing but id_candidate_event in the database
            field: 'id_candidate_event'
        },
        idCandidate: {
            type: Sequelize.INTEGER,
            field: 'id_candidate'
        },
        idEvent: {
            type: Sequelize.INTEGER,
            field: 'id_event'
        }
        
    }, {
        // model tableName will be the same as the model name
        freezeTableName: true
      });
  
    return CandidateEvent;
  };
