const express = require('express')
const helmet = require('helmet') //https://helmet.js.org/
const app = express()
const PORT = process.env.PORT || 3000

//Middlewares
// 1. Configuração do Helmet para segurança
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

// 2. Middleware para parsing do corpo da requisição
app.use(express.json())

// 3. Middleware de log
app.use((req, res, next) => {
  const horario = new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  })
  console.log(`[${horario}] catalogo-filmes | ${req.method} ${req.path}`)
  req.horario = horario
  res.on('finish', () => console.log(res.statusCode))
  next()
})

// Rotas
const filmesRoutes = require('./routes/filmes')
app.use('/filmes', filmesRoutes)

app.get('/', (req, res) => {
  res.json({ projeto: 'Catálogo de Filmes', status: 'online' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

