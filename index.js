const express = require("express");
const mongoose = require("mongoose");
const app = new express();
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const edge = require('edge.js');


// connet with database
const connectDb = require("./config/db");
connectDb();
app.use(express.json({ extended: false }));
// express Sessions
const mongoStore = connectMongo(expressSession);
app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// share session globally then we can display login log out like that conditionally
app.use("*", async (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

// router variables
const home = require("./routes/home");
const userRegister = require("./routes/userRegister");
const userLogin = require("./routes/userLogin");
const userConfirm = require("./routes/userConfirm");
const userProfile = require("./routes/userProfile");

// get Requests
app.get("/", home);

// Post Requests
app.post("/api/userRegister", userRegister);
app.post("/api/userLogin", userLogin);
app.post("/api/userConfirm", userConfirm);
app.post("/api/userProfile", userProfile);

const port = 5000;

app.listen(port, (req, res) => {
  console.log(`Server Started at Port ${port}`);
});
