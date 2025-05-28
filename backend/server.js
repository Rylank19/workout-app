import express from 'express';
import userRoutes from "./routes/user.route.js"
import exerciseRoutes from "./routes/exercise.route.js"
import { connectDB } from "./config/db.js"

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/user/", userRoutes)
app.use("/api/user/:userID/exercises/", exerciseRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
});