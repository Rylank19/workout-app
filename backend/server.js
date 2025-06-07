import express from 'express';
import userRoutes from "./routes/user.route.js"
import exerciseRoutes from "./routes/exercise.route.js"
// import calendarRoutes from "./routes/calendar.route.js"
// import planRoutes from "./routes/plan.route.js"
import workoutRoutes from "./routes/workout.route.js"
import { connectDB } from "./config/db.js"

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/user/", userRoutes)
app.use("/api/user/:userID/exercises/", exerciseRoutes)
// app.use("/api/user/:userID/calendar/", calendarRoutes)
// app.use("/api/user/:userID/plans/", planRoutes)
app.use("/api/user/:userID/workouts/", workoutRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
});