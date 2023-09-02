const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// get all users base on email
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ email: req.query.email });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// User Post
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const existingUser = await User.findOne({ email: newUser?.email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      const newUserInstance = new User(newUser);
      await newUserInstance.save();
      res.status(200).json({
        message: "user was inserted successfully",
        user: newUserInstance,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// User make admin
router.post("/all/admin/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const email = req.params.email;
    const admin = await User.updateOne(
      { email: email },
      {
        $set: {
          userRole: "admin",
        },
      }
    );
    res.status(200).json({
      message: "Make admin successfull",
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Make user general
router.post("/all/genarel/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const admin = await User.updateOne(
      { email: email },
      {
        $set: {
          userRole: "genarel",
        },
      }
    );
    res.status(200).json({
      message: "Make admin successfull",
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.patch("/", async (req, res) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    const updatedData = { gender: newUser.value };

    const updateUser = await User.updateOne(
      { email: newUser?.email },
      updatedData
    ).then((result) => {
      if (result.modifiedCount > 0) {
        console.log("Document updated successfully.");
      } else {
        console.log("No document matched the filter.");
      }
    });

    // console.log(updateUser);

    // res.send(updateUser);

    // const existingUser = await User.findOne({ email: newUser?.email });
    // if (existingUser) {
    //   return res.status(400).json({ message: "user already exists" });
    // } else {
    //   const newUserInstance = new User(newUser);
    //   await newUserInstance.save();
    //   res.status(200).json({
    //     message: "user was inserted successfully",
    //     user: newUserInstance,
    //   });
    // }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
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
