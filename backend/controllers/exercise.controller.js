import mongoose from "mongoose";
import User from '../models/user.model.js';

export const getExercises = async (req, res) => {
    console.log(req.params);
    const {userID} = req.params; // user will send this data

    if (!userID) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    try {
        const user = await User.findById(userID);
        return res.status(200).json({success: true, data: user.custom_exercises});
    } catch (error) {
        console.log("error in fetching user:", error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
};

export const createExercise = async (req, res) => {
    const {userID} = req.params;

    const exercise = req.body; // user will send this data
    console.log(exercise)

    if (!exercise.name || !exercise.muscleGroup) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({success: false, message: "Invalid user Id"});
    }

    try {
        const user = await User.findById(userID)
        console.log("Found user")
        console.log(user)
        user.custom_exercises.push({name: exercise.name, muscleGroup: exercise.muscleGroup});
        await user.save();
        res.status(201).json({success: true, data:user.custom_exercises[user.custom_exercises.length - 1]});
    } catch (error) {
        console.error("Error in create exercise:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteExercise = async (req, res) => {
    const {exerciseID} = req.params;

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

export const updateExercise = async (req, res) => {
    const { userID, exerciseID } = req.params;

    const exercise = req.body;

    console.log(exerciseID);

    if (!mongoose.Types.ObjectId.isValid(exerciseID)) {
        return res.status(404).json({success: false, message: "Invalid Exercise Id"});
    }

    console.log(exercise.name, exercise.muscleGroup)

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userID, 'custom_exercises._id': exerciseID},
            {
                $set: {
                    'custom_exercises.$.name' : exercise.name,
                    'custom_exercises.$.muscleGroup': exercise.muscleGroup
                }
            },
            { new: true}
        );

        const updatedExercise = updatedUser?.custom_exercises.find(
            (ex) => ex._id.toString() === exerciseID
        );
        res.status(200).json({ success: true, data: updatedExercise});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
}