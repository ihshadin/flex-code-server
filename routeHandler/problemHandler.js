const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const problemSchema = require("../schemas/problemSchema");
const Problem = new mongoose.model("Problem", problemSchema);

// Get all problems 
router.get("/all", async (req, res) => {
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

//Pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const result = await Problem.find()
      .skip(page * limit)
      .limit(limit);
    res.send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
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