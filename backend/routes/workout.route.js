import express from "express";
import { createWorkout, deleteWorkout, getWorkouts } from "../controllers/workout.controller.js"

const router = express.Router({mergeParams: true});


// Now we're going to 'listen' for a request for the home page (we post because we want to create)
router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.get("/", getWorkouts)

export default router;