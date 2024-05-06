// config inicial chamar o express vai procurar o módulo
const express = require('express')
const app = express() // Inicializar as apps 

// depois do db
const mongoose = require("mongoose")

const Person = require('./models/Person')




//forma de ler JSON UTILIZAR MIDDLEWARES 
app.use( //criando  o MIDDLEWARES
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(express.json())


// rotas Cadastrar
app.post('//person', async (req, res) => {
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

//Pesquisar Todos os usuários usuário

app.get('//person', async (req, res) => {
const id = req.params.id

  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

//Pesquisar usuário por ID 
app.get('//person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})



//update

app.patch('//person/:id', async (req, res) => {
  const id = req.params.id

  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})


//Deletar 
app.delete('//person/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

  //rota inicial GET pegar algo so servidor  endpoint 
  app.get('/',  (req, res) => {

  //mostrar requisição mostrar a resposta que vai ser JSON
    res.json({ message: 'Oi Express'})
})



//Entregar a porta
const DB_USER = 'thiago'
const DB_PASSWORD = encodeURIComponent('XGkpa4RsDQqn4YO8')

mongoose.connect('mongodb://localhost:27017/ARQUIVO')
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))


