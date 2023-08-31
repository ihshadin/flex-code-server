const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const problemSchema = require("../schemas/problemSchema");
const Problem = new mongoose.model("Problem", problemSchema);

// Get all problems 
router.get("/", async (req, res) => {
  try {
    const searchText = req.query.search;
    const problemLevel = req.query.level;
    let query = {};
    if (problemLevel) {
      query.level = problemLevel;
    }
    if (searchText) {
      query.title = { $regex: searchText, $options: "i" };
    }
    const data = await Problem.find(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
});

// Get Single problem details
router.get("/:id", async (req, res) => {
  const problemId = req.params.id;
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }
    res.json(problem);
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