import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

export const workoutSchema = new Schema({
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
        set_data: [{
            reps: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            }
        }], // number of sets is length and reps are specified
    }],
});

const Workout = model('Workout', workoutSchema);
export default Workout;