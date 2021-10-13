module.exports = app => {

    const candidate_event = require("../controllers/candidate.event.controller.js");
    const router = require("express").Router();

    // create a new candidate
    router.post("/", candidate_event.create);
  
    // retrieve all candidates
    router.get("/", candidate_event.findAll);
    
    // retrieve a single candidate with id
    router.get("/:id", candidate_event.findOne);
  
    // update a candidate with id
    router.put("/:id", candidate_event.update);
  
    // delete a candidate with id
    router.delete("/:id", candidate_event.delete);
  
    // delete all candidates
    router.delete("/", candidate_event.deleteAll);
  
    app.use('/api/candidateEvent', router);
  };
