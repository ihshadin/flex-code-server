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

// Data for leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboardData = await SolvedProblem.aggregate([
            {
                $lookup: {
                    from: 'students', // Name of the users collection
                    localField: 'userEmail',
                    foreignField: 'email',
                    as: 'userData',
                },
            },
            {
                $unwind: '$userData',
            },
            // {
            //     $project: {
            //         userName: '$userData.username',
            //         // userPhoto: '$userData.photo',
            //         userEmail: 1,
            //         points: 1,
            //     },
            // },
            {
                $group: {
                    _id: '$userEmail',
                    userName: { $first: '$userData.username' },
                    // userPhoto: { $first: '$userData.userPhoto' },
                    userEmail: { $first: '$userEmail' },
                    points: { $sum: '$points' },
                    problemsSolved: { $sum: 1 }, // Count of solved problems
                },
            },
            {
                $sort: { points: -1 },
            },
        ]);

        res.json(leaderboardData);
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

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