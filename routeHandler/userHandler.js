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
// ---------------------------jahid----------------------------------------
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findOne({ email: req.query.email });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// User Post
router.post("/", async (req, res) => {
  const upDateUser = req.body;
  try {
    const existingUser = await User.findOne({ email: upDateUser?.email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      const newUserInstance = new User(upDateUser);
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
    const user = await User.updateOne(
      { email: email },
      {
        $set: {
          userRole: "genarel",
        },
      }
    );
    res.status(200).json({
      message: "Make admin successfull",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.patch("/", async (req, res) => {
  try {
    const updatedData = req.body;
    const updateUser = await User.updateOne(
      { email: req.body.email },
      updatedData
    ).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
