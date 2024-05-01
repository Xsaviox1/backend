import express from "express";
import mongoose from "mongoose";
import Usuario from "./models/Usuario.js";
import cors from "cors";



const app = express();

app.use(express.json());

app.use(cors({
    methods: ['GET', 'POST']
}));
/* Verbos HTTP */
app.post("/usuario", async (request, response) => {
    const usuario = request.body;
    const novoUsuario = await Usuario.create(usuario);

    return response.status(200).json(novoUsuario);
})

app.get("/usuario", async (request, response) => {
    const buscarUsuario = await Usuario.find();
    
    return response.status(201).json(buscarUsuario);
})

app.put("/usuario/:id", async (request, response) => {
    const usuario = await Usuario.findByIdAndUpdate(request.params.id, request.body);

    return response.status(200).json({
        status: "sucesso, modificação feita em:",
        data: {
            usuario
        }
    })
});

app.delete("/usuario/:id", async (request, response) => {
    const usuario = await Usuario.findByIdAndDelete(request.params.id);
        if (!usuario) {
            return response.status(404).json({ error: "Usuário não encontrado" });
    }
    
    return response.status(200).json(usuario);
});



/* Conexão */
mongoose.connect("mongodb+srv://josesgnascimento:savio@cluster0.kevszqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",)
    .then(() => console.log("Conexão feita com sucesso"));

app.listen(3000)