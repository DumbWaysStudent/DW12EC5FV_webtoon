const express = require('express')
require('express-group-routes')
const app = express()
const port = process.env.port || 5000
const bodyParser = require('body-parser')


app.use(bodyParser.json())
const { auth } = require('./middleware')
const AuthController = require('./controller/auth')


app.group('/api/v1', (router) => {
    router.get('/', (req, res) => {
        res.send("hello")
    })

    // Api Authentication
    router.post('/login', AuthController.login)
})

app.listen(port, () => console.log(`listen to port ${port}`))