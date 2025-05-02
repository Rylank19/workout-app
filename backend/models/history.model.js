import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

const historySchema = new Schema({
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
        set_data: [{
            reps: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            }
        }]
    }],
    date: {
        type: Date,
        required: true,
    },
});

const History = model('History', historySchema);
export default History;