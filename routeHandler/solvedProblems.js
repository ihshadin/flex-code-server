const express = require('express');
const router = express.Router();
const solvedProblemsSchema = require('../schemas/solvedProblemSchema');
const { mongoose } = require('mongoose');
const SolvedProblem = new mongoose.model("SolvedProblem", solvedProblemsSchema)

// specific user get his solved problem
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
router.get('/topperdata', async (req, res) => {
    try {
        const leaderboardData = await SolvedProblem.aggregate([
            {
                $lookup: {
                    from: 'users', // Name of the users collection
                    localField: 'userEmail',
                    foreignField: 'email',
                    as: 'userData',
                },
            },
            {
                $unwind: '$userData',
            },
            {
                $group: {
                    _id: '$userEmail',
                    displayName: { $first: '$userData.name' },
                    username: { $first: '$userData.username' },
                    userPhoto: { $first: '$userData.userPhotoUrl' },
                    userEmail: { $first: '$userEmail' },
                    points: { $sum: '$points' },
                    problemsSolved: { $sum: 1 },
                },
            },
            {
                $sort: { points: -1 },
            },
        ]);

        // Sort the leaderboard data by points in descending order
        leaderboardData.sort((a, b) => b.points - a.points);

        // Calculate and assign ranks to each user
        leaderboardData.forEach((user, index) => {
            user.rank = index + 1; // Ranks start from 1
        });

        res.json(leaderboardData);
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body);
//         const solvedProblem = new SolvedProblem(req.body)
//         await solvedProblem.save()
//         res.status(200).json({ message: "success" })
//     } catch (error) {
//         res.status(500).json({ message: "error" })
//     }
// })

router.post('/', async (req, res) => {
    try {
        const title = req.body.title;
        const userEmail = req.body.userEmail;
        const existingSolvedProblem = await SolvedProblem.findOne({ title: title, userEmail: userEmail });
        
        if(existingSolvedProblem){
            // console.log('user already exists');
            res.status(403).json({ message: "Problem already solved" })
        } else {
            const solvedProblem = new SolvedProblem(req.body)
            await solvedProblem.save()
            res.status(200).json({ message: "success" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" })
    }
})

module.exports = router;