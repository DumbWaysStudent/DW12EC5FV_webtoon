const models = require('../models')
const comics = models.comics
const user = models.users
const comicDetail = models.comic_detail
const episodes = models.episodes

const Sequalize= require('sequelize')
const op = Sequalize.Op

exports.index = (req, res) => {
    comics.findAll({
        include: [{
            model: user  
        }]
    }).then(comics =>{ res.send(comics)}).catch(errror => {
        console.log(errror)
    })
}

// menampilkan episodes berdasarkan parameter comic id
exports.episodes = (req, res) => {
    comics.findAll({
        include : [{
            as : 'episodes',
            model : comicDetail
        }],
        where : {
            id : req.params.comicId
        }
    }).then(body => {res.send(body[0]['episodes'])}).catch(err => {console.log(err)})
}

exports.episodesDetails = (req, res) => {
    comicDetail.findAll({
        include : [{
            model : episodes,
            as : "Episodes Image"
        }],
        where : {
            comic : req.params.comicId,
            chapter_id : req.params.chapterId
        }
    }).then(ep => res.send(ep[0]["Episodes Image"])).catch(err => console.log(err))
}