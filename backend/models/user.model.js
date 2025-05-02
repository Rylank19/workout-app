import mongoose, { SchemaTypes } from "mongoose";
const {Schema, model} = mongoose;
import {exerciseSchema} from './exercise.model';
import {workoutSchema} from './workout.model';
import {planSchema} from './plan.model';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    catalog_exercises: { // reference to exercises that the user has saved (from the catalog of exercises or custom made)
        type: SchemaTypes.ObjectId,
        ref: 'Exercise',
    },
    custom_exercises: [exerciseSchema], // embedded exercises custom made for a particular user (may need to set a cap on this?)
    workouts: [workoutSchema], // embed and set a limit on how many workouts a user can make?
    plans: [planSchema],
});

const User = model('User', userSchema);
export default User;