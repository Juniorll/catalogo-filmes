const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// Rota principal — informações do projeto
app.get('/', (req, res) => {
  res.json({
    projeto: 'Catálogo de Filmes',
    descricao: 'API para gerenciar meu catálogo pessoal de filmes e séries',
    status: 'online'
  })
})

// Rota de filmes - Informações dos filmes
app.get('/filmes', (req, res) => {
  res.json([
    { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica', nota: 10 },
    { id: 2, titulo: 'Parasita', genero: 'Suspense', nota: 9 },
    { id: 3, titulo: 'Soul', genero: 'Animação', nota: 9 }
  ])
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
