const db = require("../models");
const Candidate = db.candidates;
const Op = db.Sequelize.Op;

// ORM methods
// create and save a new candidate
exports.create = (req, res) => {
    // validate request
    if (!req.body.nameCandidate) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // create a candidate
    const candidate = {
      nameCandidate: req.body.nameCandidate
    };
  
    // save candidate in the database
    Candidate.create(candidate)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the candidate."
        });
      });
  };

// retrieve all candidates from the database.
exports.findAll = (req, res) => {
    const nameCandidate = req.query.nameCandidate;
    var condition = nameCandidate ? { nameCandidate: { [Op.like]: `%${nameCandidate}%` } } : null;
  
    Candidate.findAll({ where: condition })
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

// find a single candidate with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Candidate.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving candidate with id=" + id
      });
    });
};

// update a candidate by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Candidate.update(req.body, {
    where: { idCandidate: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Candidate was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update candidate with id=${id}. Maybe candidate was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating candidate with id=" + id
      });
    });
};

// delete a candidate with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Candidate.destroy({
    where: { idCandidate: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Candidate was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete candidate with id=${id}. Maybe candidate was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete candidate with id=" + id
      });
    });
};

// delete all candidates from the database.
exports.deleteAll = (req, res) => {
  Candidate.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Candidates were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all candidates."
      });
    });
};
