import {create} from "zustand"
import { useUserStore } from "./user";
// this file essentially connects to our backend methods to manipulate data on the server

export interface Workout {
    _id: string;
    name: string;
    exercises: {
        exerciseId: string,
        set_data: {
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
    currentWorkout?: Workout,
    // setExercises: (exercises: []) => void,
    createWorkout: (newExercise: Workout) => Promise<Response>,
    fetchWorkouts: (uid: string) => Promise<void>,
    fetchWorkout: (uid: string, workoutId: string) => Promise<void>,
    deleteWorkout: (wid: string) => Promise<Response>,
    updateWorkout: (updatedWorkout : Workout) => Promise<Response>
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
    fetchWorkout: async (workoutId: string) => {
        const userID = useUserStore.getState().userID
        const res = await fetch(`/api/user/${userID}/workouts/${workoutId}`, {
            method: "GET",
        });
        const data = await res.json();
        return data.data; // returns the workout data
    },
    createWorkout: async (newWorkout) => {
        console.log("Made it to createWorkout")
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
    deleteWorkout: async (wid) => {
        const uid = useUserStore.getState().userID
        const res = await fetch(`/api/user/${uid}/workouts/${wid}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message};

        // this line updates the ui immediately. If not here then a refresh is needed to see changes
        set((state) => ({workouts: state.workouts.filter(workout => workout._id !== wid)}));
        return { success: true, message: data.message};
    },
    updateWorkout: async (updatedWorkout) => {
        console.log("Made it to update")
        console.log("Checking attached object: ", updatedWorkout)
        const uid = useUserStore.getState().userID;
        const res = await fetch(`/api/user/${uid}/workouts/${updatedWorkout._id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedWorkout)
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set((state) => ({workouts:state.workouts.map(workout => workout._id === updatedWorkout._id ? data.data : workout)}));
        return {success: true, message: "Workout updated successfully"};
    }
})) // this is a callback ( the brackets mean we are returning an object)