const express = require('express')
const helmet = require('helmet') //https://helmet.js.org/

const app = express()

const PORT = process.env.PORT || 3000

app.use(
  helmet({ //https://helmet.js.org/
    contentSecurityPolicy: true, //CSP pode gerar conflitos com bibliotecas externas, então é importante testar
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }
  })
)

app.use(express.json())

// Middleware de log
app.use((req, res, next) => {
  const horario = new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  })
  console.log(`[${horario}] catalogo-filmes | ${req.method} ${req.path}`)
  req.horario = horario
  res.on('finish', () => console.log(res.statusCode))
  next()
})

//Base simulada de dados
const filmes = [
  { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica', nota: 10 },
  { id: 2, titulo: 'Parasita', genero: 'Suspense', nota: 9 },
  { id: 3, titulo: 'Soul', genero: 'Animação', nota: 9 }
]

//GET Raiz da aplicação
app.get('/', (req, res) => {
  res.json({
    projeto: 'Catálogo de Filmes',
    descricao: 'API para gerenciar meu catálogo pessoal de filmes e séries',
    status: 'online'
  })
})

//POST para cadastro de novos filmes
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

//GET com filtros de busca aas//
app.get('/filmes', (req, res) => {
  const { genero, titulo, nota } = req.query

  let resultado = filmes  // começa com todos

  if (genero) {
    resultado = resultado.filter(f => f.genero.toLowerCase().includes(genero.toLowerCase()))
  }

  if (titulo) {
    resultado = resultado.filter(f =>
      f.titulo.toLowerCase().includes(titulo.toLowerCase())
    )
  }

  if (nota) {
    resultado = resultado.filter(f => Number(f.nota) >= Number(nota))
  }

  res.json(resultado)
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

// PUT /filmes/:id — atualizar filme
app.put('/filmes/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = filmes.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Filme não encontrado' })
  }

  const { titulo, genero, nota } = req.body
  filmes[index] = { id, titulo, genero, nota }
  res.json(filmes[index])
})

// DELETE /filmes/:id — remover filme
app.delete('/filmes/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = filmes.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Filme não encontrado' })
  }

  filmes.splice(index, 1)
  res.status(204).send()
})

// PATCH /filmes/:id — atualização parcial
app.patch('/filmes/:id', (req, res) => {
  const id = Number(req.params.id)
  const filme = filmes.find(f => f.id === id)

  if (!filme) {
    return res.status(404).json({ erro: 'Filme não encontrado' })
  }
  const { titulo, genero, nota } = req.body
  if (titulo) filme.titulo = titulo
  if (genero) filme.genero = genero
  if (nota) filme.nota = nota

  res.json(filme)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

