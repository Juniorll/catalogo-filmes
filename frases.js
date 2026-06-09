const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

const frases = [
  { id: 1, texto: 'A jornada de mil milhas começa com um único passo.', autor: 'Lao-Tzu' },
  { id: 2, texto: 'A simplicidade é a sofisticação máxima.', autor: 'Leonardo da Vinci' }
]

app.get('/frases', (req, res) => {
    res.json(frases)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})