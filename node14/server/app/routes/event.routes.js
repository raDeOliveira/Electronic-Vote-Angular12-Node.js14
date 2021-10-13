module.exports = app => {

    const events = require("../controllers/event.controller.js");
    const router = require("express").Router();

    // create a new event
    router.post("/", events.create);
  
    // retrieve all events
    router.get("/", events.findAll);
    
    // retrieve a single event with id
    router.get("/:id", events.findOne);
  
    // update a event with id
    router.put("/:id", events.update);
  
    // delete a event with id
    router.delete("/:id", events.delete);
  
    // delete all events
    router.delete("/", events.deleteAll);

    // check if event is still open
    app.get('/api/checkEvent/:idEvent', events.checkEventDate);

    // check if event has closed
    app.get('/api/checkEventClosed/:idEvent', events.checkEventClosed);

    app.use('/api/events', router);
  };
