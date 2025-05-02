import express from "express";
import { createUser } from "../controllers/user.controller.js"

const router = express.Router();


// Now we're going to 'listen' for a request for the home page (we post because we want to create)
router.post("/", createUser);

export default router;