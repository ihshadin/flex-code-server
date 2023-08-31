const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const exploreSchema = require('../schemas/exploreSchema');
const explore = new mongoose.model("exploreDetails", exploreSchema);

// get all NoteBook
router.get("/", async (req, res) => {
    try {
        const explores = await explore.find();
        res.json(explores);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Get Single Note details
router.get("/:id", async (req, res) => {
    try {
        const ExploreId = req.params.id;
        const Explore = await explore.findById(ExploreId);
        if (!Explore) {
            return res.status(404).json({
                message: "Explore not found!",
            });
        }
        res.json(Explore);
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
