const express = require('express');
const router = express.Router();
const solvedProblemsSchema = require('../schemas/solvedProblemSchema');
const { mongoose } = require('mongoose');
const SolvedProblems = new mongoose.model("SolvedProblems", solvedProblemsSchema)


router.get('/', async (req, res) => {
    res.send("imam vai is running")
})

router.post('/', async (req, res) => {
    const solvedProblem = new SolvedProblems(req.body)
    try {
        await solvedProblem.save()
        res.status(200).json({message: "success"})
    } catch (error) {
        res.status(500).json({message: "error"})
    }
})


module.exports = router;