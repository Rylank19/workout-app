import { Box } from '@chakra-ui/react'
import NavBar from './components/NavBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import WorkoutPage from './pages/WorkoutPage';
import ExercisesPage from './pages/ExercisesPage';
import WeeklyPlansPage from './pages/WeeklyPlansPage';
import CalendarPage from './pages/CalendarPage';
import BackgroundImage from '@/assets/Contour Line.svg'

function App() {
  return (
    <Box style={{backgroundSize: '100%', backgroundImage: `url(${BackgroundImage}`}} minW="100vw" minH={"100vh"}>
      <NavBar />
      <Routes >
        <Route path="/">
          <Route index element={<Navigate to="/exercises" replace />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/plans" element={<WeeklyPlansPage />} />
          <Route path="/calendar"element={<CalendarPage />} />
        </Route>
      </Routes>
    </Box>
  )
}

export default App;
