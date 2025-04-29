import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

const exerciseSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    muscleGroup: {
        type: String,
    },
});

const Exercise = model('Exercise', exerciseSchema);
export default Exercise;