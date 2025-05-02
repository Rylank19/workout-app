import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    workouts: [{
        workoutId: {
            type: SchemaTypes.ObjectId,
            ref: 'Workout',
            required: true,
        },
        startDays: {
            type: Number,
            required: true,
        }, // Would be nice to use a single number for with each bit representing a day of the week
        rotation: {
            type: Number, // if the user wants to specify starting days and also wants to rotate the workout to different days
        },
    }],
});

const Plan = model('Plan', planSchema);
export default Plan;