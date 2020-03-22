const express = require('express')
//variável express armazena o modulo 
const app = express()
// criação do objeto da classe express

app.use(express.json())
const users = ['diego', 'claudio', 'Mateus']

//construindo middleware global
app.use((req, res, next) => {
    
    console.log(`Metodo: ${req.method}; URL: ${req.url}`)

    return next()
})

//construindo middleware local para verificar ser o nome foi passado no body
function checkUserExists(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({ error: 'User name is required '})
    }

    return next()
}

// criando middleware para verificar se usúario está no array
// alterando a requisição: adicionando o atributo user que sera o usuário com od passado por param 
function checkUserArray(req, res, next){
    
    const user = users[req.params.index]

    if(!user) {
        return res.status(400).json({ error: "User does not exist"})
    }
    
    req.user = user

    return next()

}
//rota que retorna todos os usuários 
app.get('/users', (req, res) =>{

    return res.json(users)
})
//rota que retorna o usuário do id X 
app.get('/users/:id', checkUserArray, (req, res) => {

    return res.json(req.user)

})
// rota para criação de um novo usuário 

app.post('/user', checkUserExists, (req, res) =>{
    
    const { name } = req.body
    
    users.push(name)

    return res.json(users)

})

//rota para alterar dado de um usuário

app.put('/user/:index', checkUserArray, checkUserExists, (req, res) => {

    const {index} = req.params
    const {nome} = req.body

    users[index] = nome

    return res.json( users )
})

app.delete('/user/:index', checkUserArray, (req, res) => {

    const { index } = req.params

    users.splice(index, 1)

    return res.send()
})

app.listen(3000)