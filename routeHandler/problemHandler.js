const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const problemSchema = require("../schemas/problemSchema");
const Problem = new mongoose.model("Problem", problemSchema);


// Create a new Add problem solving code

router.post("/", async (req, res) => {
    const newProblem = new Problem(req.body);
    try {
      await newProblem.save();
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error",
      });
    }
  });




module.exports = router;