const authJwt = require("../middleware/verifyJwtToken");

module.exports = function(app) {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    // to store/pass token by browser headers
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    // create a new user
    router.post("/", users.create);

    // retrieve all users
    router.get("/", users.findAll);

    // retrieve a single user with id
    router.get("/:id", users.findOne);

    // update a user with id
    router.put("/:id", users.update);

    // delete a user with id
    router.delete("/:id", users.delete);

    // delete all users
    router.delete("/", users.deleteAll);

    // check duplicate before user sign up
    // app.post("/api/auth/signup", [users.checkDuplicateUserNameOrEmail], users.signup);

    // user sign up
    // app.post("/api/auth/signup", users.signup);

    // user sign in
    app.post('/api/auth/signin', users.signin);

    // user content with token verification
    app.get('/api/test/user', [authJwt.verifyToken], users.userContent);

    // updated user
    app.put('/api/update/user/:id', (req, res) => {
        users.updateUser(req, res);
    });

    // get events by user id
    app.get('/api/getEvents/:id',(req, res) =>{
        users.getEventByUserId(req, res);
    });

    app.use('/api/users', router);
  };
