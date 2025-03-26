const fs = require("fs")

const {getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deletaLivro} = require("../services/livro")

function getLivros(req, res) {
    try{
        const livros = getTodosLivros()
        res.send(livros)
    }
    catch{
        res.sendStatus(500).json({message: "Página não encontrada"})
    }
}

function getLivro(req, res) {
    try{
        const id = req.params.id
        
        if(id && Number(id)){
            const livro = getLivroPorId(id)
            res.send(livro)
        }
        else{
            res.sendStatus(422)
        }
    }
    catch (error) {
        res.sendStatus(500).json({message: "Livro não encontrado"})
    }
}

function postLivro(req, res) {
    try{
        const livroNovo = req.body
        if(req.body.nome){
            insereLivro(livroNovo)
            res.send("Livro Inserido com sucesso")
            res.sendStatus(201)
        }
        else{
            res.send("O campo nome é obrigatório!")
            res.sendStatus(422)
        }
        
    }
    catch (error){
        res.sendStatus(500)
        res.send("Não foi possivel enviar o livro")
    }
}

function patchLivro(req, res){
    try{
        const id = req.params.id
        if(id && Number(id)){
            const body = req.body

            modificaLivro(body, id)
            res.send("Item modificado com sucesso")
        }
        else{
            res.sendStatus(422)
        }
        
        
    } catch(error) {
        res.sendStatus(500)
        res.send("Não foi possivel enviar o livro")
    }
}

function deleteLivro(req, res){
    try{
        const id = req.params.id
        if(id && Number(id)){
            deletaLivro(id)
            res.send("Livro deletado com sucesso!")
        }
        else{
            res.sendStatus(422)
        }
    } catch (error) {
        res.sendStatus(404)
        res.send("Livro não encontrado para deletar")
    }
}
    

module.exports = {
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    deleteLivro,
}
