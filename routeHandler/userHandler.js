const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const verifyLogin = require("../middlewares/verifyLogin");
const verifyAdmin = require("../middlewares/verifyAdmin");
const User = new mongoose.model("User", userSchema);

router.get("/all", verifyLogin, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    return res.status(200).json(userCount);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user count", error: error.message });
  }
});

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

router.get("/", verifyLogin, async (req, res) => {
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
      if (upDateUser.userRole === "general") {
        const newUserInstance = new User(upDateUser);
        await newUserInstance.save();
        res.status(200).json({
          message: "user was inserted successfully",
          user: newUserInstance,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Only general user can created" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// User make admin
router.post("/all/admin/:email", verifyLogin, verifyAdmin, async (req, res) => {
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
router.post(
  "/all/genarel/:email",
  verifyLogin,
  verifyAdmin,
  async (req, res) => {
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
  }
);

router.patch("/", verifyLogin, async (req, res) => {
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
