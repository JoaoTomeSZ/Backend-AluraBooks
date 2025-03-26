const express = require("express")                                                                      
const rotaLivros = require("./routes/livro")

const app = express()
const port = 3000;
app.use(express.json())

app.use('/livros', rotaLivros)

app.listen(port, () => {
    console.log("Server is now running on port: " + port)
})