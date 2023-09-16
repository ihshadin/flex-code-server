const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const playgroundSchema = require("../schemas/playgroundSchema");
const playground = new mongoose.model("playground", playgroundSchema);

//find all project
router.get("/", async (req, res) => {
  try {
    const userName = req.query.username;
    const projects = await playground.find({ username: userName });
    res.json(projects);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Get Single Note details
router.get("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await playground.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
      });
    }
    res.json(project);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Create a new Project
router.post("/", async (req, res) => {
  try {
    const newProject = new playground(req.body);
    await newProject.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// delete a project
router.delete("/", async (req, res) => {
  // console.log(projectId);
  try {
    const projectId = req.query.delete; // Assuming the query parameter is named 'delete'
    const deletedProject = await playground.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
