const models = require('../models')
const comics = models.comics
const user = models.users
const comicDetail = models.comic_detail

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

// menampilkan berdasarkan parameter
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
