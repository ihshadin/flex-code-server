const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const Student = new mongoose.model("Student", userSchema);

<<<<<<< HEAD

=======
>>>>>>> 66d30403e0578fb6b9e4bdeb11ebd53fca9f4bf7
// router.get('/', async (req, res) => {
//   console.log('This is home page for server site');
// })

// get all users
router.get("/", async (req, res) => {
  console.log("This is home page for server site", req.query.email);
  try {
    const users = await Student.find({ email: req.query.email });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const existingUser = await Student.findOne({ email: newUser?.email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      const newUserInstance = new Student(newUser);
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

// router.put("/", async (req, res) => {
//   try {
//     const newUser = req.body;
//     // console.log(newUser);

//     const updateUser = await Student.updateOne(
//       {
//         email: newUser?.email,
//       }
//       // {
//       //   $set: {
//       //     username: newUser.username,
//       //     email: newUser.email,
//       //   },
//       // }
//     );

//     console.log(updateUser);

//     // res.send(updateUser);

//     // const existingUser = await Student.findOne({ email: newUser?.email });
//     // if (existingUser) {
//     //   return res.status(400).json({ message: "user already exists" });
//     // } else {
//     //   const newUserInstance = new Student(newUser);
//     //   await newUserInstance.save();
//     //   res.status(200).json({
//     //     message: "user was inserted successfully",
//     //     user: newUserInstance,
//     //   });
//     // }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

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
