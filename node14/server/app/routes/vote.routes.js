module.exports = app => {

    const votes = require("../controllers/vote.controller.js");
    const router = require("express").Router();

    // create a new vote
    router.post("/", votes.create);
  
    // retrieve all votes
    router.get("/", votes.findAll);
    
    // retrieve a single vote with id
    router.get("/:id", votes.findOne);
  
    // update a vote with id
    router.put("/:id", votes.update);
  
    // delete a vote with id
    router.delete("/:id", votes.delete);
  
    // delete all votes
    router.delete("/", votes.deleteAll);

    // save user vote
    app.post('/api/saveVote', votes.saveVote);

    // send vote confirmation email
    app.post('/api/sendVoteMail/:email', (res, req) =>{
        votes.sendVoteConfirmationEmail (res, req);
    })

    // check if user already voted
    app.get('/api/voteController/', (req, res) =>{
        const idVoter = req.query.voter;
        const idEvent = req.query.event;
        votes.hasVoted(req, res, idVoter, idEvent);
    });

    app.use('/api/votes', router);
};
