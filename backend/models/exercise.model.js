import mongoose from "mongoose";
const {Schema, SchemaTypes, model} = mongoose;

const exerciseSchema = new Schema({
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