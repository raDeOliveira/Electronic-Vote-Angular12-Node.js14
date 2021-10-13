const db = require("../models");
const CandidateEvent = db.candidate_event;
const Op = db.Sequelize.Op;

// ORM methods
// create and save a new candidate_event
exports.create = (req, res) => {
    // validate request
    if (!req.body.idCandidate) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // create a candidate_event
    const candidate_event = {
      idCandidate : req.body.idCandidate,
      idEvent : req.body.idEvent
    };
  
    // save candidate in the database
    CandidateEvent.create(candidate_event)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the candidate_event."
        });
      });
  };

// retrieve all candidates from the database.
exports.findAll = (req, res) => {
    const candidateEvent = req.query.candidateEvent;
    var condition = candidateEvent ? { candidateEvent: { [Op.like]: `%${candidateEvent}%` } } : null;

    CandidateEvent.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving candidates."
            });
        });
};

// find a single candidate_event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

    CandidateEvent.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving candidate_event with id=" + id
      });
    });
};

// update a candidate_event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

    CandidateEvent.update(req.body, {
    where: { idCandidateEvent: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Candidate_event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update candidate_event with id=${id}. Maybe candidate_event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating candidate_event with id=" + id
      });
    });
};

// delete a candidate_event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

    CandidateEvent.destroy({
    where: { idCandidateEvent: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Candidate_event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete candidate_event with id=${id}. Maybe candidate_event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete candidate_event with id=" + id
      });
    });
};

// delete all candidate_event from the database.
exports.deleteAll = (req, res) => {
    CandidateEvent.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Candidate_event were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all candidate_event."
      });
    });
};
