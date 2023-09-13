const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const exploreSchema = require('../schemas/exploreSchema');
const Explore = new mongoose.model("Explore", exploreSchema);

// get all NoteBook
router.get("/", async (req, res) => {
    try {
        const explores = await Explore.find();
        res.json(explores);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Get Single Note details
router.get("/:id", async (req, res) => {
    try {
        const ExploreId = req.params.id;
        const explore = await Explore.findById(ExploreId);
        if (!explore) {
            return res.status(404).json({
                message: "Explore not found!",
            });
        }
        res.json(explore);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create a new Note
// router.post("/", async (req, res) => {
//     try {
//         const newExplore = new explore(req.body);
//         await newExplore.save();
//         res.status(200).json({
//             message: "success",
//         });
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;
