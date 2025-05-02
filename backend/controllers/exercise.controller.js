import Exercise from '../models/exercise.model.js';
import mongoose from "mongoose";
import User from '../models/user.model.js';

export const createExercise = async (req, res) => {
    const exercise = req.body; // user will send this data

    if (!exercise.userID || !exercise.name || !exercise.muscleGroup) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    if (!mongoose.Types.ObjectId.isValid(exercise.userID)) {
        return res.status(404).json({success: false, message: "Invalid user Id"});
    }

    try {
        const user = await User.findByIdAndUpdate(exercise.userID)
        console.log("Found user")
        console.log(user)
        user.custom_exercises.push({name: exercise.name, muscleGroup: exercise.muscleGroup});
        await user.save();
        res.status(201).json({success: true, data:user.custom_exercises[0]});
    } catch (error) {
        console.error("Error in create exercise:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteExercise = async (req, res) => {
    const {id} = req.params;

    const user = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Exercise Id"});
    }

    if (!user.ID) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    try {
        await User.findByIdAndUpdate(user.ID, { $pull: {custom_exercises: {_id: id} } }); // ask MongoDB to find an item in product collection and delete
        res.status(200).json({success: true, message: `Product of id: ${id} deleted`});
    } catch (error) {
        console.log("error in deleting product");
        res.status(500).json({success: false, message: "Server Error"});
    }
};