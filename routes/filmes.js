const express = require('express')
const router = express.Router()

const filmes = [
  { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica', nota: 10 },
  { id: 2, titulo: 'Parasita', genero: 'Suspense', nota: 9 },
  { id: 3, titulo: 'Soul', genero: 'Animação', nota: 9 }
]

router.get('/', (req, res, next) => {
  try {
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

  if (!resultado) return res.status(404).json({ erro: 'Filme não encontrado' })
  res.json(resultado)  

}catch (err) {
  next(err) // Passa o erro para o middleware de tratamento de erros
}
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const filme = filmes.find(f => f.id === id)
  if (!filme) return res.status(404).json({ erro: 'Filme não encontrado' })
  res.json(filme)
})

router.post('/', (req, res, next) => {
  const { titulo, genero, nota } = req.body
  const novo = { id: filmes.length + 1, titulo, genero, nota }
  filmes.push(novo)
  res.status(201).json(novo)
})

router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const index = filmes.findIndex(f => f.id === id)
  if (index === -1) return res.status(404).json({ erro: 'Filme não encontrado' })
  const { titulo, genero, nota } = req.body
  filmes[index] = { id, titulo, genero, nota }
  res.json(filmes[index])
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const index = filmes.findIndex(f => f.id === id)
  if (index === -1) return res.status(404).json({ erro: 'Filme não encontrado' })
  filmes.splice(index, 1)
  res.status(204).send()
})

router.get('/erro-teste', (req, res, next) => {
  throw new Error('Erro de teste!')
})

module.exports = router