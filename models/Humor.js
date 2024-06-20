import mongoose from "mongoose";

const { Schema, model } = mongoose;

const humorSchema = new mongoose.Schema({
    humor: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    }
    
})

export default mongoose.model("Humor",humorSchema)