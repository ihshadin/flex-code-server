const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const noteBookSchema = require("../schemas/noteBookSchema");
const verifyLogin = require("../middlewares/verifyLogin");
const NoteBook = new mongoose.model("noteBook", noteBookSchema);

// get all NoteBook
router.get("/", verifyLogin, async (req, res) => {
  try {
    const userEmail = req.query.email;
    const NoteBooks = await NoteBook.find({ userEmail: userEmail }).sort({
      data: "desc",
    });
    res.json(NoteBooks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Get Single Note details
router.get("/:id", verifyLogin, async (req, res) => {
  try {
    const NoteBookId = req.params.id;
    const noteBook = await NoteBook.findById(NoteBookId);
    if (!noteBook) {
      return res.status(404).json({
        message: "NoteBook not found!",
      });
    }
    res.json(noteBook);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Create a new Note
router.post("/", async (req, res) => {
  try {
    const newNote = new NoteBook(req.body);
    await newNote.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete("/", async (req, res) => {
  // console.log(projectId);
  try {
    const noteID = req.query.delete; // Assuming the query parameter is named 'delete'
    const deletedNote = await NoteBook.findByIdAndDelete(noteID);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
