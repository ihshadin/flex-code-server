const express = require("express");
const mongoose = require("mongoose");
const challengeSchema = require("../schemas/challengeSchema");
const router = express.Router();
const Challenge = new mongoose.model("Challenge", challengeSchema);
const { ObjectId } = require('mongodb')

router.get('/:username', async (req, res) => {
  try {
    const challenge = await Challenge.find({ receiver: req.params.username }).sort({ data: 'desc' });
    // console.log(req.params.username);
    return res.status(200).json(challenge);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
})

router.put('/one/:id/:ownId', (req, res) => {
  const { id, ownId } = req.params;
  const { winner, winnerTime } = req.body;
  Challenge.findOneAndUpdate({ problemId: new ObjectId(id), _id: new ObjectId(ownId) }, { $set: { winner, winnerTime } })
    .then(message => {
      if (!message) {
        return res.status(404).send({ message: 'Message not found' });
      }
      res.send(message);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Server error' });
    });
});

router.post('/', async (req, res) => {
  try {
    const newChallenge = new Challenge(req.body);
    await newChallenge.save();
    res.status(200).json({
      message: "success",
    });
    console.log('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
})

router.delete("/", async (req, res) => {
  // console.log(req.query.delete);
  try {
    const challengeID = req.query.delete; // Assuming the query parameter is named 'delete'
    const deletedChallenge = await Challenge.findByIdAndDelete(challengeID);

    if (!deletedChallenge) {
      return res
        .status(404)
        .json({ success: false, message: "Challenge not found" });
    }

    res.json({ success: true, message: "Challenge deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;