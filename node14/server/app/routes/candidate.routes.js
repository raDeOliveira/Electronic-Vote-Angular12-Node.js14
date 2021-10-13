module.exports = app => {

    const candidates = require("../controllers/candidate.controller.js");
    const router = require("express").Router();

    // create a new candidate
    router.post("/", candidates.create);
  
    // retrieve all candidates
    router.get("/", candidates.findAll);
    
    // retrieve a single candidate with id
    router.get("/:id", candidates.findOne);
  
    // update a candidate with id
    router.put("/:id", candidates.update);
  
    // delete a candidate with id
    router.delete("/:id", candidates.delete);
  
    // delete all candidates
    router.delete("/", candidates.deleteAll);

    app.use('/api/candidates', router);
  };
