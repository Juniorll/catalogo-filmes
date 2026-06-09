const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

const filmes = [
  { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica', nota: 10 },
  { id: 2, titulo: 'Parasita', genero: 'Suspense', nota: 9 },
  { id: 3, titulo: 'Soul', genero: 'Animação', nota: 9 }
]

app.get('/', (req, res) => {
  res.json({
    projeto: 'Catálogo de Filmes',
    descricao: 'API para gerenciar meu catálogo pessoal de filmes e séries',
    status: 'online'
  })
})

app.get('/filmes', (req, res) => {
  res.json(filmes)
})

app.post('/filmes', (req, res) => {
  const { titulo, genero, nota } = req.body

  const novoFilme = {
    id: filmes.length + 1,
    titulo,
    genero,
    nota
  }

  filmes.push(novoFilme)
  res.status(201).json(novoFilme)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

