import express from 'express';
import userRoutes from "./routes/user.route.js"
import exerciseRoutes from "./routes/exercise.route.js"
// import calendarRoutes from "./routes/calendar.route.js"
// import planRoutes from "./routes/plan.route.js"
import workoutRoutes from "./routes/workout.route.js"
import { connectDB } from "./config/db.js"
import path from "path"

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(express.json());

app.use("/api/user/", userRoutes)
app.use("/api/user/:userID/exercises/", exerciseRoutes)
// app.use("/api/user/:userID/calendar/", calendarRoutes)
// app.use("/api/user/:userID/plans/", planRoutes)
app.use("/api/user/:userID/workouts/", workoutRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./frontend/dist")));
    
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
});