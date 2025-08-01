import { Box } from '@chakra-ui/react'
import NavBar from './components/NavBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import WorkoutPage from './pages/WorkoutPage';
import ExercisesPage from './pages/ExercisesPage';
import WeeklyPlansPage from './pages/WeeklyPlansPage';
import CalendarPage from './pages/CalendarPage';
import BackgroundImage from '@/assets/Contour Line.svg'
// import ActiveWorkout from './pages/ActiveWorkout';
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [showNav] = useState(true); // Placeholder for show state, replace with actual state management

  return (
    <Box style={{backgroundSize: '100%', backgroundImage: `url(${BackgroundImage}`}} minW="100vw" minH={"100vh"}>
      {showNav && <NavBar />}
      <Routes >
        <Route index element={<Navigate to="/exercises" replace />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/plans" element={<WeeklyPlansPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        {/* <Route path="/activeworkout/:workoutId" element={<ActiveWorkout funcNav={setShowNav} />} /> */}
      </Routes>
      <Toaster />
    </Box>
  )
}

export default App;
