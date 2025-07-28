import {create} from "zustand"
import { useUserStore } from "./user";

// this file essentially connects to our backend methods to manipulate data on the server

export interface Exercise {
    name: string;
    muscleGroup: string;
    _id?: string;
}

interface Response {
    success: boolean;
    message: string;
}

interface MyState {
    exercises : Exercise[],
    setExercises: (exercises: []) => void,
    createExercise: (newExercise: Exercise) => Promise<Response>,
    fetchExercises: (uid: string) => Promise<void>,
    deleteExercise: (uid: string, eid: string) => Promise<Response>,
    updateExercise: (updatedExercise : Exercise) => Promise<Response>
}

export const useExerciseStore = create<MyState>((set) => ({
    exercises: [],
    setExercises: (exercises: []) => set({ exercises }),
    createExercise: async (newExercise) => {
        const uid = useUserStore.getState().userID;
        if (!newExercise.name || !newExercise.muscleGroup) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch(`/api/user/${uid}/exercises`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newExercise)
        });
        const data = await res.json();
        set((state) => ({exercises:[...state.exercises, data.data]})); // updates exercises with the new product + all the old ones
        return {success: true, message: "Exercise created successfully"};
    },
    fetchExercises: async (uid) => {
        console.log(`/api/user/${uid}/exercises/`)
        const res = await fetch(`/api/user/${uid}/exercises/`, {
            method: "GET",
        });
        const data = await res.json();
        set({ exercises: data.data});
    },
    deleteExercise: async (uid, eid) => {
        const res = await fetch(`/api/user/${uid}/exercises/${eid}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message};

        // this line updates the ui immediately. If not here then a refresh is needed to see changes
        set((state) => ({exercises: state.exercises.filter(exercises => exercises._id !== eid)}));
        return { success: true, message: data.message};
    },
    updateExercise: async (updatedExercise) => {
        const uid = useUserStore.getState().userID;
        const res = await fetch(`/api/user/${uid}/exercises/${updatedExercise._id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedExercise)
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set((state) => ({exercises:state.exercises.map(exercise => exercise._id === updatedExercise._id ? data.data : exercise)}));
        return {success: true, message: "Exercise updated successfully"};
    }
})) // this is a callback ( the brackets mean we are returning an object)