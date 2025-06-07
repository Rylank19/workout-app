import {create} from "zustand"
import { useUserStore } from "./user";
import { Exercise } from "./exercise";
// this file essentially connects to our backend methods to manipulate data on the server

export interface Workout {
    _id?: string;
    name: string;
    exercises: {
        exerciseId: string,
        setData: {
            reps: number,
            weight: number,
        }[]
    }[];
}

interface Response {
    success: boolean;
    message: string;
}

interface MyState {
    workouts : Workout[],
    // setExercises: (exercises: []) => void,
    createWorkout: (newExercise: Workout) => Promise<Response>,
    fetchWorkouts: (uid: string) => Promise<void>,
    // deleteExercise: (uid: string, eid: string) => Promise<Response>,
    // updateExercise: (updatedExercise : Exercise, eid: string) => Promise<Response>
}

export const useWorkoutStore = create<MyState>((set) => ({
    workouts: [],
    fetchWorkouts: async () => {
        const userID = useUserStore.getState().userID
        const res = await fetch(`/api/user/${userID}/workouts/`, {
            method: "GET",
        });
        const data = await res.json();
        set({ workouts: data.data});
    },
    createWorkout: async (newWorkout) => {
        if (!newWorkout.name || !newWorkout.exercises || newWorkout.exercises.length == 0) {
            return {success:false, message:"Please fill in all fields."}
        }
        const userID = useUserStore.getState().userID
        const res = await fetch(`/api/user/${userID}/workouts`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newWorkout)
        });
        const data = await res.json();
        set((state) => ({workouts:[...state.workouts, data.data]})); // updates exercises with the new product + all the old ones
        return {success: true, message: "Exercise created successfully"};
    },
})) // this is a callback ( the brackets mean we are returning an object)