import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

const workoutSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    exercises: [{
        exerciseId: {
            type: SchemaTypes.ObjectId,
            ref: 'Exercise',
            required: true,
        },
        sets: [{
            type: Number,
            required: true,
        }], // number of sets is length and reps are specified
    }],
});

const Workout = model('Workout', workoutSchema);
export default Workout;