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

/*Mandando ver */
/*Nessa tela é possivel fazer o cadastro de email e senha */
/*Se o email já existir ele vai dar erro */
app.post("/usuario/tela1", async (request, response) => {
    try {
        const { email, senha } = request.body;

        // Verifica se o email já está cadastrado
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return response.status(400).json({ error: "E-mail já cadastrado" });
        }

        // Cria um novo usuário com os dados fornecidos
        const novoUsuario = await Usuario.create({ email, senha });

        return response.status(200).json(novoUsuario);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return response.status(500).json({ error: "Erro interno ao criar usuário" });
    }
});
/*Agora esse comando é responsavel por adicionar as informações da segunda tela */
/*Os campos adicionados dizem respeito a segunda tela */
/*Para utilizar esse comando é necessario ter o id do usuario */
app.put("/usuario/tela2/:id", async (request, response) => {
    const { id } = request.params;
    const { nome, dataNasc, genero, uf, cidade, telefone, cid } = request.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return response.status(404).json({ error: "Usuário não encontrado" });
        }

        // Atualizar informações do usuário
        usuario.nome = nome;
        usuario.dataNasc = dataNasc;
        usuario.genero = genero;
        usuario.uf = uf;
        usuario.cidade = cidade;
        usuario.telefone = telefone;
        usuario.cid = cid;

        await usuario.save();

        return response.status(200).json({ message: "Informações do usuário atualizadas com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar informações do usuário:", error);
        return response.status(500).json({ error: "Erro interno ao atualizar informações do usuário" });
    }
});
/*Agora será adicionado apenas o humorAtual se referindo ao modal ou a home */
app.post("/usuario/:id/humorBasico", async (request, response) => {
    try {
        const { id } = request.params;
        const { humorAtual} = request.body;

        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return response.status(404).json({ error: "Usuário não encontrado" });
        }

        const novaEntradaHumor = { humorAtual};
        usuario.humor.push(novaEntradaHumor);
        await usuario.save();

        return response.status(200).json(usuario);
    } catch (error) {
        console.error("Erro ao adicionar humor:", error);
        return response.status(500).json({ error: "Erro interno ao adicionar humor" });
    }
});
/*Agora está é a parte responsável por adicionar os dados do diario ao banco */
app.post("/usuario/:id/humor", async (request, response) => {
    try {
        const { id } = request.params;
        const { humorAtual, humorTexto, humorAudio } = request.body;

        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return response.status(404).json({ error: "Usuário não encontrado" });
        }

        const novaEntradaHumor = { humorAtual, humorTexto, humorAudio };
        usuario.humor.push(novaEntradaHumor);
        await usuario.save();

        return response.status(200).json(usuario);
    } catch (error) {
        console.error("Erro ao adicionar humor:", error);
        return response.status(500).json({ error: "Erro interno ao adicionar humor" });
    }
});






/* Conexão */
mongoose.connect("mongodb+srv://josesgnascimento:savio@cluster0.kevszqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",)
    .then(() => console.log("Conexão feita com sucesso"));

app.listen(3000)