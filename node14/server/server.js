const express = require("express");
const cors = require("cors");
const app = express();
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// needed to pass info from browser headers
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// initialize Sequelize from the models
const db = require("./app/models");
db.sequelize.sync();

// welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// setting the routes
require("./app/routes/candidate.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/candidate.event.routes")(app);
require("./app/routes/voter.event.routes")(app);
require("./app/routes/vote.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
