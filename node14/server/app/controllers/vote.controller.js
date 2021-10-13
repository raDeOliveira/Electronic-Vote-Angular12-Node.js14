const db = require("../models");
const nodemailer = require("nodemailer");
const { QueryTypes } = require("sequelize");
const Vote = db.votes;
const Op = db.Sequelize.Op;

// ORM methods
// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body.idVoter) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // create a vote
    const vote = {
        idVoter: req.body.idVoter,
        publicVote: req.body.publicVote,
        idCandidate: req.body.idCandidate,
        idEvent: req.body.idEvent,
        dateCreation: req.body.dateCreation
    };

    // save vote in the database
    Vote.create(vote)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the vote."
        });
      });
  };

// retrieve all votes from the database.
exports.findAll = (req, res) => {
    const vote = req.query.vote;
    var condition = vote ? { vote: { [Op.like]: `%${vote}%` } } : null;

    Vote.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving votes."
        });
      });
  };

// find a single vote with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

    Vote.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving vote with id=" + id
      });
    });
};

// update a vote by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

    Vote.update(req.body, {
    where: { idVote: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "vote was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update vote with id=${id}. Maybe vote was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating vote with id=" + id
      });
    });
};

// delete a vote with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

    Vote.destroy({
    where: { idVote: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "vote was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete vote with id=${id}. Maybe vote was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete vote with id=" + id
      });
    });
};

// delete all users from the database.
exports.deleteAll = (req, res) => {
    Vote.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} votes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all votes."
      });
    });
};

// send vote confirmation email
exports.sendVoteConfirmationEmail = async (req) => {
    let nameCandidate = '';
    let emailUser = '';

        await db.sequelize.query(
        "select c.name_candidate, u.email from `user` u " +
            "join vote v on u.id = v.id_voter " +
            "join candidate c on v.id_candidate = c.id_candidate " +
            "where u.id = " + req.body.idVoter + " "
        , {type: QueryTypes.SELECT})
        .then(user => {
            nameCandidate = JSON.stringify(user[0].name_candidate)
            emailUser = JSON.stringify(user[0].email)
        })

    const email = req.params.email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        type: "SMTP",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: 'postmaster.homepi@gmail.com',
            pass: 'Rasopostmaster_2020'
        }
    });

    var mailOptions = {
        from: 'Evote@mail.com',
        to: email,
        subject: 'Vote confirmation',
        text: 'Hi ' + emailUser + '' +
            '\n' +
            '\nYou voted in candidate: ' + nameCandidate
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

// save vote
exports.saveVote = async (req, res) => {
    const vote = {
        idVoter: req.body.idVoter,
        publicVote: 'Yes',
        idCandidate: req.body.idCandidate,
        idEvent: req.body.idEvent,
    };
    Vote.create(vote)
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};

// count votes
exports.countvotes = async (req, res) => {
    const idEvent = req.params.idEvent;
    await db.sequelize.query(
        "select c.name_candidate, count(v.id_vote) as total from candidate_event ce " +
        "left join vote v on v.id_candidate = ce.id_candidate " +
        "join candidate c on ce.id_candidate = c.id_candidate " +
        "where ce.id_event = " + idEvent + " group by ce.id_candidate order by count(v.id_vote) desc "
        , { type: QueryTypes.SELECT }, {
            attributes: ['total' ,'name_candidate'],
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

// check if user has voted or not, and print candidates to vote
let checkVote = false;
exports.hasVoted = async (req, res, idVoter, idEvent) => {
    await db.sequelize.query(
        "SELECT v.id_vote from vote v where v.id_voter = " + idVoter + " And v.id_event = " + idEvent + " "
        , { type: QueryTypes.SELECT },

        { attributes: ['id_vote'] }
)
        .then(data => {
            if (data.length === 1) {
                checkVote = true;
                res.send(
                    {
                        status: "ok",
                        message: "You have already voted"
                    }
                );
            } else {
                db.sequelize.query(
                    "select * from candidate c " +
                    "join candidate_event ce on c.id_candidate = ce.id_candidate " +
                    "join event e on ce.id_event = e.id_event " +
                    "where e.id_event = " + idEvent + " "
                    , { type: QueryTypes.SELECT },

                    { attributes: ['id_candidate', 'name_candidate'] }

                )
                    .then(data => {
                        res.send(data);
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving candidate."
            });
        });
};

