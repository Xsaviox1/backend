import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    dataNasc: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    }
    
})

export default mongoose.model("Usuario",usuarioSchema)