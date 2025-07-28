import express from "express";
import { createWorkout, deleteWorkout, getWorkouts, getWorkout, updateWorkout } from "../controllers/workout.controller.js"

const router = express.Router({mergeParams: true});


// Now we're going to 'listen' for a request for the home page (we post because we want to create)
router.post("/", createWorkout);

router.delete("/:workoutId", deleteWorkout);

router.get("/", getWorkouts)

router.get("/:workoutId", getWorkout);

router.put("/:workoutId", updateWorkout)

export default router;