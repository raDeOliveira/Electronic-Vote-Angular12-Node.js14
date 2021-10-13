module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        idEvent: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true,
            // will result in an attribute that is idEvent when user facing but name_event in the database
            field: 'id_event'
        },
        eventName: {
            type: Sequelize.STRING,
            field: 'event_name'
        },
        typeDocument: {
            type: Sequelize.STRING,
            field: 'type_document'
        },
        eventDescription: {
            type: Sequelize.STRING,
            field: 'event_description'
        },
        startDate:{
            type: Sequelize.DATE,
            field: 'start_date'
        },
        endDate: {
            type: Sequelize.DATE,
            field: 'end_date'
        }
        
    }, {
        // model tableName will be the same as the model name
        freezeTableName: true
      });
  
    return Event;
  };
