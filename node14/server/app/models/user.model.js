module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true,
            // will result in an attribute that is id when user facing but id_user in the database
            field: 'id'
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        },

        nidentificacao: {
            type: Sequelize.STRING,
            field: 'nidentificacao'
        },
        type_document: {
            type: Sequelize.STRING,
            field: 'type_document'
        },
        access_code: {
            type: Sequelize.STRING,
            field: 'access_code'
        },
        createdUser: {
            type: Sequelize.DATE,
            field: 'created'
        }

    }, {
        // model tableName will be the same as the model name
        freezeTableName: true,
    });

    return User;
};
