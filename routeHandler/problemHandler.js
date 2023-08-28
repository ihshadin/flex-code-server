const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const problemSchema = require("../schemas/problemSchema");
const Problem = new mongoose.model("Problem", problemSchema);

// Get all problems 
router.get("/", async (req, res) => {
    try {
    const problemLevel=req.query.level
    if (!problemLevel) {
      const data = await Problem.find();
      res.json(data);
    } else {
      const data = await Problem.find({ level: problemLevel });
      res.json(data);
    }
    } catch (err) {
      res.status(500).json({
        message: "error",
      });
    }
});




// Create a new Add problem solving code
router.post("/", async (req, res) => {
    const newProblem = new Problem(req.body);
    try {
      await newProblem.save();
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      res.status(500).json({
        message: "error",
      });
    }
  });




module.exports = router;