const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

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
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    console.log("Database connection failed");
  }
};
databaseConnect();

// Routes function
const flexHandler = require("./routeHandler/flexHandler");
const blogHandler = require("./routeHandler/blogHandler");
const userHandler = require("./routeHandler/userHandler");
const feedbackHandler = require("./routeHandler/feedbackHandler");

// application routes
app.get("/", (req, res) => {
  res.send("FlexCode. Unlock your code knowledge");
});

app.use("/problems", flexHandler);
app.use("/blog", blogHandler);
app.use("/student", userHandler);
app.use("/feedback", feedbackHandler);

app.listen(port, (req, res) => {
  console.log("FlexCode are runnin on: ", port);
});
