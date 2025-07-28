import Workout from '../models/workout.model.js';
import mongoose from "mongoose";
import User from '../models/user.model.js';

export const getWorkouts = async (req, res) => {
    console.log(req.params);
    const {userID} = req.params; // user will send this data

    if (!userID) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    try {
        const user = await User.findById(userID);
        return res.status(200).json({success: true, data: user.workouts});
    } catch (error) {
        console.log("error in fetching user:", error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
};

export const getWorkout = async (req, res) => {
    console.log(req.params);
    const {userID, workoutId} = req.params; // user will send this data

    if (!userID) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    try {
        const user = await User.findById(userID);

        user.workouts.get(workoutId, (workout) => {
            if (!workout) {
                return res.status(404).json({success: false, message: "Workout not found"});
            }
            return res.status(200).json({success: true, data: workout});
        });
    } catch (error) {
        console.log("error in fetching user:", error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
};

export const createWorkout = async (req, res) => {
    const workout = req.body; // user will send this data
    const {userID} = req.params; // userID in url parameter
    console.log(workout)

    if (!workout.name || !workout.exercises) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({success: false, message: "Invalid user Id"});
    }

    try {
        const user = await User.findById(userID)
        console.log("Found user")
        console.log(user)
        console.log("Got exercises")
        console.log(workout.exercises)
        const newWorkout = new Workout({name: workout.name, exercises: workout.exercises});
        user.workouts.push(newWorkout);
        await user.save();
        res.status(201).json({success: true, data:user.workouts[user.workouts.length - 1]});
    } catch (error) {
        console.error("Error in create exercise:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteWorkout = async (req, res) => {
    const {userID, workoutId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({success: false, message: "Invalid Exercise Id"});
    }

    if (!userID) {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
    }

    try {
        await User.findByIdAndUpdate(userID, { $pull: {workouts: {_id: workoutId} } }); // ask MongoDB to find an item in product collection and delete
        res.status(200).json({success: true, message: `Workout of id: ${workoutId} deleted`});
    } catch (error) {
        console.log("error in deleting workout");
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const updateWorkout = async (req, res) => {
    console.log("Made it into updateWorkout controller")
    const { userID, workoutId } = req.params;

    const workout = req.body;

    console.log(workoutId);

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        console.log("Hello")
        return res.status(404).json({success: false, message: "Invalid Exercise Id"});
    }

    console.log("Checking sent object")
    console.log(workout.name, workout.exercises)

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userID, 'workouts._id': workoutId},
            {
                $set: {
                    'workouts.$.name' : workout.name,
                    'workouts.$.exercises': workout.exercises
                }
            },
            { new: true}
        );
    
        console.log("Working")

        const updatedWorkout = updatedUser?.workouts.find(
            (workout) => workout._id.toString() === workoutId
        );
        res.status(200).json({ success: true, data: updatedWorkout});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
}