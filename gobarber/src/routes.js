import { Router } from 'express'

const routes  = new Router()

routes.get('/', (req, res) => {
    return res.json({ massege: "hello world"})
})

export default routes