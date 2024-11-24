import fs from "fs";
import {getAllPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/GeminiService.js";

export async function listarPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function postar(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (error) {
        res.status(500).json({ "Erro": error.message });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        res.status(500).json({ "Erro": error.message });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const postAtualizado = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.body.alt
        }
        const postCriad = await atualizarPost(id, postAtualizado);
        res.status(200).json(postCriad);
    } catch (error) {
        res.status(500).json({ "Erro": error.message });
    }
}