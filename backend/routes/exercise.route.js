import express from "express";
import { createExercise, deleteExercise, getExercises } from "../controllers/exercise.controller.js"

const router = express.Router();


// Now we're going to 'listen' for a request for the home page (we post because we want to create)
router.post("/", createExercise);

router.delete("/:id", deleteExercise);

router.post("/user-exercises", getExercises)

export default router;