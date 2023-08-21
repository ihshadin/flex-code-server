const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// get all todos
router.get("/", async (req, res) => {
  console.log("This is home page for server site");
});

// router.post("/users", async (req, res) => {
//   const user = req.body;
//   console.log(user);

//   const query = { email: user.email };
//   const existingUser = await userCollection.findOne(query);

//   if (existingUser) {
//     return res.send({ message: "user already existinge" });
//   }

//   const result = await userCollection.insertOne(user);
//   res.send(result);
// });

module.exports = router;
