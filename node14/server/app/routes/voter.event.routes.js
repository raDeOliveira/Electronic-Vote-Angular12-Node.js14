module.exports = app => {

    const voter_event = require("../controllers/voter.event.controller.js");
    const router = require("express").Router();

    // create a new event
    router.post("/", voter_event.create);
  
    // retrieve all events
    router.get("/", voter_event.findAll);
    
    // retrieve a single event with id
    router.get("/:id", voter_event.findOne);
  
    // update a event with id
    router.put("/:id", voter_event.update);
  
    // delete a event with id
    router.delete("/:id", voter_event.delete);
  
    // delete all events
    router.delete("/", voter_event.deleteAll);
  
    app.use('/api/voterEvent', router);
  };
