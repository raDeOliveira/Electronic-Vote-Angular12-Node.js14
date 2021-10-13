const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const moment = require("moment");

// ORM methods
// create and save a new event
exports.create = (req, res) => {
    // validate request
    if (!req.body.eventName) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // create a event
    const event = {
      eventName: req.body.eventName,
      typeDocument: req.body.typeDocument,
      eventDescription: req.body.eventDescription, 
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
  
    // save event in the database
    Event.create(event)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the event."
        });
      });
  };

// retrieve all events from the database.
exports.findAll = (req, res) => {
    const eventName = req.query.eventName;
    var condition = eventName ? { eventName: { [Op.like]: `%${eventName}%` } } : null;
  
    Event.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
        });
      });
  };

// find a single event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving event with id=" + id
      });
    });
};

// update an event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
    where: { id_event: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating event with id=" + id
      });
    });
};

// delete an event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.destroy({
    where: { id_event: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete event with id=${id}. Maybe event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete event with id=" + id
      });
    });
};

// delete all events from the database.
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events."
      });
    });
};

// check if event is still open
exports.checkEventDate = async (req, res) => {
    const actualDate = new Date(moment().format("YYYY/MM/DD"));
    const idEvent = req.params.idEvent
    await db.sequelize.query(
        "SELECT end_date from event where id_event = " + idEvent + " "
        , {type: QueryTypes.SELECT})
        .then(date => {

            let bdDate = JSON.stringify(date[0].end_date);
            const mysqlDate = new Date(bdDate);

            if (mysqlDate.getTime() > actualDate.getTime() || mysqlDate.getTime() === actualDate.getTime()) {
                res.send(
                    {
                        status: "ok",
                        message: "Can't see results, event still open!"
                    }
                    );
            } else {
                // count votes
                const idEvent = req.params.idEvent;
                db.sequelize.query(
                    "select c.name_candidate, count(v.id_vote) as total from candidate_event ce " +
                    "left join vote v on v.id_candidate = ce.id_candidate " +
                    "join candidate c on ce.id_candidate = c.id_candidate " +
                    "where ce.id_event = " + idEvent + " group by ce.id_candidate order by count(v.id_vote) desc "
                    , { type: QueryTypes.SELECT }, {
                        attributes: ['total' ,'name_candidate'],
                    })
                    .then(data => {
                        res.send(data, );
                    })
            }
        })
}

// check if event has closed
exports.checkEventClosed = async (req, res) => {
    const actualDate = new Date(moment().format("YYYY/MM/DD"));
    const idEvent = req.params.idEvent
    await db.sequelize.query(
        "SELECT end_date from event where id_event = " + idEvent + " "
        , {type: QueryTypes.SELECT})
        .then(date => {

            let bdDate = JSON.stringify(date[0].end_date);
            const mysqlDate = new Date(bdDate);

            if (mysqlDate.getTime() < actualDate.getTime()) {
                res.send(
                    {
                        status: "closed",
                        message: "Event has been closed!"
                    }
                );
            }
        })
}


