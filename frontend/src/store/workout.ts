import {create} from "zustand"

// this file essentially connects to our backend methods to manipulate data on the server

export interface Workout {
    _id: string;
    name: string;
    exercises: [{
        exerciseId: string,
        setData: [{
            reps: number,
            weight: number,
        }]
    }];
}

// interface Response {
//     success: boolean;
//     message: string;
// }

interface MyState {
    workouts : Workout[],
    // setExercises: (exercises: []) => void,
    // createExercise: (newExercise: {userID: string, name: string; muscleGroup: string}) => Promise<Response>,
    // fetchExercises: (uid: string) => Promise<void>,
    // deleteExercise: (uid: string, eid: string) => Promise<Response>,
    // updateExercise: (updatedExercise : Exercise, eid: string) => Promise<Response>
}

export const useWorkoutStore = create<MyState>(() => ({
    workouts: [],
})) // this is a callback ( the brackets mean we are returning an object)