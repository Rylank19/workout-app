import { Box } from '@chakra-ui/react'
import NavBar from './components/NavBar';
import {Route, Routes} from 'react-router-dom';
import WorkoutPage from './pages/WorkoutPage';
import ExercisesPage from './pages/ExercisesPage';
import WeeklyPlansPage from './pages/WeeklyPlansPage';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <Box minH={"100vh"}>
      <NavBar />
      <Routes >
        <Route path="/" element={<ExercisesPage />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/plans" element={<WeeklyPlansPage />} />
        <Route path="/calendar"element={<CalendarPage />} />
      </Routes>
    </Box>
  )
}

export default App;
