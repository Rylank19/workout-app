import {create} from "zustand"

// this file essentially connects to our backend methods to manipulate data on the server

export interface Exercise {
    name: string;
    muscleGroup: string;
    _id: string;
}

interface Response {
    success: boolean;
    message: string;
}

interface MyState {
    exercises : Exercise[],
    setExercises: (exercises: []) => void,
    createExercise: (newExercise: {userID: string, name: string; muscleGroup: string}) => Promise<Response>,
    fetchExercises: (uid: string) => Promise<void>,
    deleteExercise: (uid: string, eid: string) => Promise<Response>,
    // updateExercise: (updatedExercise : Exercise, eid: string) => Promise<Response>
}

export const useExerciseStore = create<MyState>((set) => ({
    exercises: [],
    setExercises: (exercises: []) => set({ exercises }),
    createExercise: async (newExercise) => {
        if (!newExercise.userID || !newExercise.name || !newExercise.muscleGroup) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/exercises", {
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
        const res = await fetch("/api/exercises/user-exercises", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userID: uid})
        });
        const data = await res.json();
        set({ exercises: data.data});
    },
    deleteExercise: async (uid, eid) => {
        const res = await fetch(`/api/exercises/${eid}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ID: uid})
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message};

        // this line updates the ui immediately. If not here then a refresh is needed to see changes
        set((state) => ({exercises: state.exercises.filter(exercises => exercises._id !== eid)}));
        return { success: true, message: data.message};
    },
    // updateProduct: async (updatedProduct, pid) => {
    //     const res = await fetch(`/api/products/${pid}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify(updatedProduct)
    //     });
    //     const data = await res.json();
    //     if(!data.success) return { success: false, message: data.message};
    //     set((state) => ({products:state.products.map(product => product._id === pid ? data.data : product)}));
    //     return {success: true, message: "Product updated successfully"};
    // }
})) // this is a callback ( the brackets mean we are returning an object)