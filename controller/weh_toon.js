const models = require('../models')
const comics = models.comics
const user = models.users
const comicDetail = models.comic_detail
const episodes = models.episodes

const Sequalize= require('sequelize')
const Op = Sequalize.Op

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


// menampilkan pages berdasarkan chapter dari comic yang kita pilih
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

// menampilkan comic favorite berdasarkan user
exports.myFavorite = (req, res) => {
    user.findAll({
        include : [{
            model : comics,
            as : "My Favorite"
        }],
        where : {
            name : {
                [Op.like] : `%${req.query.user}%`
            }
        }
    }).then(fav => res.send(fav[0]["My Favorite"])).catch(err => console.log(err))
}