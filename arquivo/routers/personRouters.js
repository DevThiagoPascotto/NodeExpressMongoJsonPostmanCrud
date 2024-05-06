// chamando a Rota
const router = require('express').Router()
const Person = require('./models/Person')

// rotas
router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

module.exports = router