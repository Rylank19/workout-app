import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWorkoutStore } from '@/store/workout';
import { useUserStore } from '@/store/user';
import WorkoutList from '@/components/activeWorkout/WorkoutList';
import DetailedExerciseList from '@/components/activeWorkout/DetailedExerciseList';
import { useExerciseStore } from '@/store/exercise';

const ActiveWorkout = ({funcNav} : {funcNav: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();
  
  // TODO: This should move to active workout
  const handleClick = () => {
    funcNav(true); // restore navbar
    navigate(-1); // navigate to workouts page
  }

  const {workoutId} = useParams(); 
  const workoutStore = useWorkoutStore();
  const {userID} = useUserStore();
  const exerciseStore = useExerciseStore();

  
  useEffect(() => {
    console.log("ActiveWorkout mounted and navbar removed");
    funcNav(false); // remove navbar
    workoutStore.fetchWorkouts(userID); // Fetch all workouts for the user
    exerciseStore.fetchExercises(userID); // fetch all exercises for the user
  }, [exerciseStore, funcNav, userID, workoutStore]);
  
  const workout = workoutStore.workouts.find(w => w._id === workoutId);

  const [started, setStarted] = useState(false)

  if (started)
    return <DetailedExerciseList exercises={exerciseStore.exercises} workout={workout} handleClick={handleClick} />
  return <WorkoutList exercises={exerciseStore.exercises} workout={workout} setStarted={setStarted} handleClick={handleClick} />


}

export default ActiveWorkout