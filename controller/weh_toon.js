const models = require('../models')
const comics = models.comics
const user = models.users
const comicDetail = models.comic_detail
const episodes = models.episodes

const Sequalize= require('sequelize')
const Op = Sequalize.Op

// Menampilkan Semua comic dan pengarangnya
exports.index = (req, res) => {
    comics.findAll({
        include: [{
            model: user  
        }]
    }).then(comics =>{ res.send(comics)}).catch(errror => {
        console.log(errror)
    })
}

// Menampilkan pengarang dan comic yang dibuatnya
exports.creator = (req, res) => {
    user.findAll({
        include: [{
            model: comics
        }],
        where : {
            name : req.params.userName
        }
    }).then(creator =>{ res.send(creator[0]["comics"])}).catch(errror => {
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

// Menampilkan hasil search berdasarkan title
exports.searchTitle = (req, res) => {
    comics.findAll({
        where : {
            title : {
                [Op.like] : `%${req.query.title}%`
            }
        }
    }).then(search => res.send(search)).catch(err => console.log(err))
}

// Membuat comic baru
exports.storeComic = (req, res) => {
    
    comics.create(req.body)
    .then(()=> {
        res.send({
            message: "success",
        })
    })
}

// Update my webtoon creation
exports.updateChapter = (req, res) => {

    comics.update(req.body, {where: {id: req.params.comic_id}})
        .then(()=> {
            comics.findOne({
                where : {
                    id : req.params.comic_id
                }
            }).then(comic => res.send(comic))
    }).catch(err => console.log(err))
}

// Delete comic
exports.deleteComic = (req, res) => {
    comics.destroy({
        where: {
            createdBy : req.params.user_id,
            id : req.params.comic_id}})
            .then((comic)=> {res.send({
                message: "success",
                comic
            })
        })
    }

// CREATE MY EPISODE IMPLEMENTATION

// Membuat episode baru
exports.storeEpisode = (req, res) => {
    const {episodes_img} = req.body
    episodes.create({
        title_id : req.params.comic_id, episodes_img
    })
    .then(()=> {
        res.send({
            message: "success",
        })
    })
}

// Melihat semua episode yang sudah di buat berdasarkan chapter
exports.getEpisodes = (req, res) => {
    comicDetail.findAll({
        include : [{
            model : episodes,
            as : "Episodes Image"
        }],
        where : {
            comic : req.params.wehtoon_id,
            chapter_id : req.params.episode_id
        }
    }).then(ep => res.send(ep[0]["Episodes Image"])).catch(err => console.log(err))
}

