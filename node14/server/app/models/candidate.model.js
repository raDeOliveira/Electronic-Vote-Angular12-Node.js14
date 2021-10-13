module.exports = (sequelize, Sequelize) => {
    const Candidate = sequelize.define("candidate", {
        idCandidate: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true,
            // will result in an attribute that is idCandidate when user facing but id_candidate in the database
            field: 'id_candidate'
        },
        nameCandidate: {
            type: Sequelize.STRING,
            field: 'name_candidate'
        }
        
    }, {
        // model tableName will be the same as the model name
        freezeTableName: true
      });
  
    return Candidate;
  };
