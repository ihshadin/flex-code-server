const express = require('express');
const router = express.Router();
const solvedProblemsSchema = require('../schemas/solvedProblemSchema');
const { mongoose } = require('mongoose');
const SolvedProblem = new mongoose.model("SolvedProblem", solvedProblemsSchema)

router.get('/', async (req, res) => {
    try {
        const solvedProblems = await SolvedProblem.find();
        res.json(solvedProblems);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

router.get('/userSolveProblem', async (req, res) => {
    try {
        const userEmail = req.query.email
        const solvedProblems = await SolvedProblem.find({ userEmail: userEmail });
        res.json(solvedProblems);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

router.post('/', async (req, res) => {
    try {
        const solvedProblem = new SolvedProblem(req.body)
        await solvedProblem.save()
        res.status(200).json({ message: "success" })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
})



module.exports = router;