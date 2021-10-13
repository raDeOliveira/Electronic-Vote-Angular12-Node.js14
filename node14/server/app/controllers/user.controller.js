const db = require("../models");
const config = require("../middleware/config.jwt");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const User = db.users;
const Op = db.Sequelize.Op;

// ORM methods
// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // create a user
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        identificationNumberUser: req.body.identificationNumberUser,
        typeOfDocumentUser: req.body.typeOfDocumentUser,
        accessCode: req.body.accessCode
    };

    // save user in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };

// retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

// update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// delete all users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// RAW SQL querys
// user sign up
exports.signup = (req, res) => {

    // if input fields empty
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // create a user
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        identificationNumberUser: req.body.identificationNumberUser,
        typeOfDocumentUser: req.body.typeOfDocumentUser,
        accessCode: bcrypt.hashSync(req.body.accessCode, 8)
    };
    User.create(user)
        .then(data => {
            if (user.email.exists) {
                return res.status(404).send('User already exists.');
            }
            res.send("User registered successfully!");
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// check duplicated email
exports.checkDuplicateUserNameOrEmail = (req, res, next) => {
    // if name is already in use
    User.findOne({
        where: { name: req.body.name }
    }).then(user => {
        if(user){
            res.status(400).send("Fail -> Username is already taken!");
            return;
        }
        // if email is already in use
        User.findOne({
            where: { email: req.body.email }
        }).then(user => {
            if(user){
                res.status(400).send("Fail -> Email is already in use!");
                return;
            }
            next();
        });
    });
}

// user sign in comparing email and password with DB
exports.signin = (req, res) => {

    // if input fields empty
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    User.findOne({ where: { email: req.body.email }
    }).then(user => {
        if (!user) {
            return res.status(404).send('User Not Found.');
        }

        // do a replace on the PHP prefix password for the Node prefix bcrypt
        const convertedPassHash = user.password.replace('$2y$', '$2a$');
        const passwordIsValid = bcrypt.compareSync(req.body.password, convertedPassHash);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
        }

        const token = jwt.sign({id: user.id}, config.secret, {
            // expires in 24 h
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, accessToken: token, user: user });

    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
}

// user content
exports.userContent = (req, res) => {
    User.findOne({
        where: {id: req.userId},
        attributes: ['id', 'name', 'email', 'password', 'nidentificacao', 'type_document', 'access_code'],
        }
    ).then(user => {
        res.status(200).send({
            "user": user}
        );
    })
        .catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
};

// update user
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const user = {};

    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password !== undefined){
         user.password = bcrypt.hashSync(req.body.password, 8);
    }

    user.nidentificacao = req.body.nidentificacao;
    user.type_document = req.body.type_document;
    user.access_code = req.body.access_code;

    User.update(user, {
        where: { id: id }
    })
        .then(data => {
            res.send("User updated successfully!!!");
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// get event by user id
exports.getEventByUserId = async (req, res) => {
    const id = req.params.id;
    await db.sequelize.query(
        "select * from user u " +
        "join voter_event ve on u.id = ve.id_user " +
        "join event e on ve.id_event = e.id_event " +
        "where u.id = " + id + " "
        , { type: QueryTypes.SELECT }, {
            // where: {id: req.userId},
            attributes: ['id_event' ,'event_name'],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving candidate."
            });
        });
};


