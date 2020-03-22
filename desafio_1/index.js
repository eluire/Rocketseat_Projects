const express = require('express')

app = express()

app.use(express.json())

// array de objetos  
const projects = []
var cont_req = 1

//middlewear global para log 
app.use((req, res, next) => {
    console.log(`Foram feitas ${cont_req} requisições até agora`)

    return next()
})

//middlewear para verificar se existe esse id 
function check_id_exists(req, res, next){
    const { index } = req.params 

    if(!projects.find( p => p.id === index)){
        return res.send("esse id não foi cadastrado")
    }
    return next()
}
//middlewear para incrementar o cont 
function cont_plus_plus(req, res, next){
    cont_req++

    return next()
}
//rota para adicionar novo projeto 
app.post('/projects', cont_plus_plus, (req, res) =>{
    const { id, title, tasks } = req.body

    projects.push({ "id": id, "title": title, "tasks": tasks })

    return res.send("Usuário cadastrado")

})
// rota para listar projeto específico
app.get('/projects/:index', cont_plus_plus, check_id_exists, (req, res) => {

    return res.json(projects.find(p => p.id === req.params.index))

})
// rota para listar todos os projetos

app.get('/projects', cont_plus_plus, (req, res) =>{

    return res.json(projects)
})
//Rota para alterar titulo de um projeto 
app.put('/projects/:index', cont_plus_plus, check_id_exists, (req,res) =>{

    const { index } = req.params
    const { title } = req.body 

    const flag = projects.findIndex(p => p.id === index)

    projects[flag].title = title

    console.log(projects)

    return res.send("Titulo alterado com sucesso")
})
//Rota para deletar um projeto 

app.delete('/projects/:index', cont_plus_plus, check_id_exists, (req, res) =>{

    const { index } = req.params
    flag = projects.findIndex(p => p.id === index)

    projects.splice(flag, 1)

    return res.send("projeto deletado com sucesso")
})
app.post('/projects/:index/tasks', cont_plus_plus, check_id_exists, (req, res) =>{

    const { index } = req.params
    const { title } = req.body

    const flag = projects.findIndex(p => p.id == index)
    projects[flag].tasks.push(title)

    return res.send("nova task adicionada com sucesso")
})

app.listen(3333)