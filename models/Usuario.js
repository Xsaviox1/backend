import mongoose from "mongoose";

const { Schema, model } = mongoose;

const humorSchema = new Schema({
    humorAtual: {
        type: String
    },
    humorTexto: {
        type: String
    },
    humorAudio: {
        type: String
    },
    humorAlteracao: {
        type: Date,
        default: Date.now
    }
});

const usuarioSchema = new Schema({
    nome: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    dataNasc: {
        type: String,
    },
    genero: {
        type: String
    },
    uf: {
        type: String
    },
    cidade: {
        type: String
    },
    telefone: {
        type: String
    },
    cid: {
        type: String
    },
    humor: [humorSchema],
    dataCriacao: {
        type: Date,
        default: Date.now
    }
    
});

export default model("Usuario", usuarioSchema);
