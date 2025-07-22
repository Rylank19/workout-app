import express from "express";
import { createExercise, deleteExercise, getExercises, updateExercise } from "../controllers/exercise.controller.js"

const router = express.Router({mergeParams: true});


// Now we're going to 'listen' for a request for the home page (we post because we want to create)
router.post("/", createExercise);

router.delete("/:id", deleteExercise);

router.get("/", getExercises)

router.put("/:exerciseID", updateExercise);

export default router;