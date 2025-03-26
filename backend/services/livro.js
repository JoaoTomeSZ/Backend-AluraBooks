const fs = require("fs")
const { postLivro } = require("../controllers/livro")

function getTodosLivros(){
    return JSON.parse(fs.readFileSync("livros.json"))
}

function getLivroPorId(id) {
    const livros = JSON.parse(fs.readFileSync("livros.json"))
 
    const livroFiltrado = livros.filter( livro => livro.id === id )[0]
    return livroFiltrado
 }

function insereLivro(livroNovo){
    const livros = JSON.parse(fs.readFileSync("livros.json"))
    const novaListaDeLivros = [...livros, livroNovo]
    fs.writeFileSync("livros.json", JSON.stringify(novaListaDeLivros))
}

function modificaLivro(modificacoes, id){
    let livrosAtuais = JSON.parse(fs.readFileSync("livros.json"))
    const indiceModificado = livrosAtuais.findIndex(livro => livro.id === id)
    const conteudoMudado = { ...livrosAtuais[indiceModificado], ...modificacoes}
    //livrosAtuais[indiceModificado] -> {id: "2", nome: "livro irado"}
    //modificacoes -> {nome: "nome mucho legal"}
    livrosAtuais[indiceModificado] = conteudoMudado;

    fs.writeFileSync("livros.json", JSON.stringify(livrosAtuais))
}

function deletaLivro(id){
    let livrosAtuais = JSON.parse(fs.readFileSync("livros.json"))
    const indiceDeletado = livrosAtuais.findIndex(livro => livro.id === id)
    const deletar = delete livrosAtuais[indiceDeletado]
    livrosAtuais = livrosAtuais.filter(livros => livros !== null)
    fs.writeFileSync("livros.json", JSON.stringify(livrosAtuais))

    //const livrosFiltrados = livros.filter( livro => livro.id !== id) vai filtrar todos os livros que nao sejam o id requerido
    //fs.writeFileSync("livros.json", JSON.stringify(livrosFiltrados)) vai substituir o objeto atual, removendo os id selecionados
}

module.exports = {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletaLivro,
}