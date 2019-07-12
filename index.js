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
const allProfiles = require("./routes/getAllProfiles");
const oneProfile = require("./routes/getOneProfile");
const deleteUser = require("./routes/deleteUser");
const deleteProfile = require("./routes/deleteProfile");
const addExperiance = require("./routes/addExperiance");
const deleteExperience = require("./routes/deleteExperience");
const addEducation = require("./routes/addEducation");
const deleteEducation = require("./routes/deleteEducation");
const githubUsername = require("./routes/githubUsername");
const getPosts = require("./routes/getPosts");
const addPosts = require("./routes/addPost");

// get Requests
app.get("/", home);
app.get("/api/profiles", allProfiles);
app.get("/api/profile/:userId", oneProfile);
app.get("/api/profile/github/:username", githubUsername);
app.get("/api/posts", getPosts);

// Post Requests
app.post("/api/userRegister", userRegister);
app.post("/api/userLogin", userLogin);
app.post("/api/userConfirm", userConfirm);
app.post("/api/userProfile", userProfile);
app.post("/api/posts", addPosts);

// Delete Requests
app.delete('/api/user/:id', deleteUser);
app.delete('/api/profile/:id', deleteProfile);
app.delete('/api/profile/experience/:id', deleteExperience);
app.delete('/api/profile/education/:id', deleteEducation);

// Put Requests
app.put('/api/user/experiance', addExperiance);
app.put('/api/user/education', addEducation);

const port = 5000;

app.listen(port, (req, res) => {
  console.log(`Server Started at Port ${port}`);
});
