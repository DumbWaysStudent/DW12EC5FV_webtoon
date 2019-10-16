const express = require('express')
require('express-group-routes')
const app = express()
const port = process.env.port || 5000
const bodyParser = require('body-parser')


app.use(bodyParser.json())
const { auth } = require('./middleware')
const AuthController = require('./controller/auth')
const ToonController = require('./controller/weh_toon')


app.group('/api/v1', (router) => {
    router.get('/', (req, res) => {
        res.send("hello")
    })

    // Api Authentication
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    // Get Comic dan created by
    router.get('/wehtoons', ToonController.index)

    // Get comic episodes by comic id
    router.get('/wehtoons/:comicId/episodes', ToonController.episodes)
})

app.listen(port, () => console.log(`listen to port ${port}`))