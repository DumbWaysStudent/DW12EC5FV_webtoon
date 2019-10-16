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

    // Get episodes image pages
    router.get('/wehtoons/:comicId/episode/:chapterId', ToonController.episodesDetails)

    // Get favorite comic by user dan user perlu melakukan login
    router.get('/wehtoons/favorite', auth, ToonController.myFavorite)

    // Get comic by title search
    router.get('/wehtoons/search', ToonController.searchTitle)

    // Get MyCreation
    router.get('/user/:userName/wehtoons', auth, ToonController.creator)

    // Create Comic
    router.post('/user/user_id/wehtoon', auth, ToonController.storeComic)

    // Edit comic
    router.put('/user/:user_id/webtoon/:comic_id', auth, ToonController.updateChapter)

    // Delete comic
    router.delete('/user/:user_id/wehtoon/:comicId', ToonController.deleteComic)

    // Create Episodes
    router.post('/user/:user_id/wehtoon/:comicId/episode', ToonController.storeEpisode)

    // GET semua Episodes setelah di buat
    router.get('/user/:user_id/wehtoon/:comicId/episode/:episode_id/images', ToonController.getEpisodes)

    // Menambahkan Pages untuk chapter yagn sudah di buat 27
    router.post('/user/:user_id/webtoon/:comicId/episode/:episode_id', ToonController.storePages)

})

app.listen(port, () => console.log(`listen to port ${port}`))