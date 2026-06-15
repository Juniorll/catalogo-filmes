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

/*app.get('/filmes', (req, res) => {
  res.json(filmes)
})*/ //removido para adicionar filtro por gênero

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

app.get('/filmes', (req, res) => {
  const { genero } = req.query
  if (genero) {
    const filtrados = filmes.filter(f => f.genero === genero)
    return res.json(filtrados)
  }
  res.json(filmes)
})

// GET /filmes/:id — busca por ID
app.get('/filmes/:id', (req, res) => {
  const id = Number(req.params.id)
  const filme = filmes.find(f => f.id === id)
  if (!filme) {
    return res.status(404).json({ erro: 'Filme não encontrado' })
  }
  res.json(filme)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

