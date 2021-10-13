const db = require("../models");
const VoterEvent = db.voter_event;
const Op = db.Sequelize.Op;

// ORM methods
// create and save a new event
exports.create = (req, res) => {
    // validate request
    if (!req.body.idUser) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // create a user_event
    const voter_event = {
      idUser : req.body.idUser,
        idEvent : req.body.idEvent,
    };

    // save user_event in the database
    VoterEvent.create(voter_event)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user_event."
        });
      });
  };

// retrieve all user_events from the database.
exports.findAll = (req, res) => {
    const voterEvent = req.query.voterEvent;
    var condition = voterEvent ? { voterEvent: { [Op.like]: `%${voterEvent}%` } } : null;

    VoterEvent.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user_events."
        });
      });
  };

// find a single user_event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

    VoterEvent.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user_event with id=" + id
      });
    });
};

// update an user_event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

    VoterEvent.update(req.body, {
    where: { idUserEvent: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "User_event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user_event with id=${id}. Maybe user_event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user_event with id=" + id
      });
    });
};

// delete an user_event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

    VoterEvent.destroy({
    where: { idUserEvent: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "User_event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user_event with id=${id}. Maybe user_event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user_event with id=" + id
      });
    });
};

// delete all user_events from the database.
exports.deleteAll = (req, res) => {
    VoterEvent.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} user_events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user_events."
      });
    });
};
