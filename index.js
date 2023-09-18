const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
require('colors')
// Middleware
app.use(cors());
app.use(express.json());

const dburi = `mongodb+srv://${process.env.FLEXCODE_USERNAME}:${process.env.FLEXCODE_PASSWORD}@cluster0.f5zl9xv.mongodb.net/flexCodeDB?retryWrites=true&w=majority`;

const databaseConnect = async () => {
  try {
    await mongoose.connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 30000,
    });

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "72h",
      });
      res.send({ token });
    });

    console.log("Database connection successful".cyan.underline);
  } catch (error) {
    console.log(error.message);
    console.log("Database connection failed");
  }
};
databaseConnect();

// Routes function

const blogHandler = require("./routeHandler/blogHandler");
const userHandler = require("./routeHandler/userHandler");
const feedbackHandler = require("./routeHandler/feedbackHandler");
const noteBookHandler = require("./routeHandler/noteBookHandler");
const paymentHandler = require("./routeHandler/paymentHandler");
const playgroundHandler = require("./routeHandler/playgroundHandler");
const solvedProblems = require("./routeHandler/solvedProblems");
const problemHandler = require("./routeHandler/problemHandler");
const exploreHandler = require("./routeHandler/exploreHandler");
const sendEmail = require("./routeHandler/sendEmailHandler");
const challenge = require("./routeHandler/challengeHandler");


// application routes
app.get("/", (req, res) => {
  res.send("FlexCode. Unlock your code knowledge");
});

app.use("/blog", blogHandler);
app.use("/users", userHandler);
app.use("/feedback", feedbackHandler);
app.use("/noteBooks", noteBookHandler);
app.use("/payment", paymentHandler);
app.use("/playground", playgroundHandler);
app.use("/solvedProblems", solvedProblems);
app.use("/problem", problemHandler);
app.use("/explore", exploreHandler);
app.use("/sendEmail", sendEmail);
app.use("/challenge", challenge);

app.get("/", (req, res) => {
  res.send("FlexCode. Unlock your code knowledge");
});

app.listen(port, (req, res) => {
  console.log(`FlexCode are running on: ${port}`.red.bold);
});
