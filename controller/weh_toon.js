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

// Update chapter
exports.updateComic = (req, res) => {

    comics.update(req.body, {where: {id: req.params.comicId}})
        .then(()=> {
            comics.findOne({
                where : {
                    id : req.params.comicId
                }
            }).then(comic => res.send(comic))
    }).catch(err => console.log(err))
}

// Delete comic
exports.deleteComic = (req, res) => {
    comics.destroy({
        where: {
            createdBy : req.params.user_id,
            id : req.params.comicId}})
            .then((comic)=> {res.send({
                message: "success",
                comic
            })
        })
    }

// Membuat chapter baru
exports.storeChapter = (req, res) => {
    const {title_episodes, imgurl_episodes, chapter_id} = req.body
    comicDetail.create({
        title_episodes, imgurl_episodes, chapter_id, comic : req.params.comicId
    })
    .then(()=> {
        res.send({
            message: "success",
        })
    })
}

// Melihat chapter berdasarkan comic
exports.getChapter = (req, res) => {
    comics.findAll({
        include : [{
            model : comicDetail,
            as : 'episodes',
        }],
        where : {
            id : req.params.comicId
        }
    })
    .then(chapter => {
        res.send(chapter[0]["episodes"])
    })
}

// Update Chapter
exports.updateChapter = (req, res) => {

    comicDetail.update(req.body, {where: {comic: req.params.comicId, chapter_id : req.params.episode_id}})
        .then(()=> {
            comicDetail.findOne({
                where : {
                    comic : req.params.comicId,
                    chapter_id : req.params.episode_id
                }
            }).then(comic => res.send(comic))
    }).catch(err => console.log(err))
}

// Delete Chapter
exports.deleteChapter = (req, res) => {
    comicDetail.destroy({
        where: {
            comic: req.params.comicId,
            chapter_id : req.params.episode_id}})
            .then((comic)=> {res.send({
                message: "success",
                comic
            })
        })
    }

// Membuat pages baru baru untuk chapter tertentu
exports.storePages = (req, res) => {
    const {episodes_img, pages} = req.body
    episodes.create({
        title_id : req.params.comicId, episodes_img, pages
    })
    .then(()=> {
        res.send({
            message: "success",
        })
    })
}

// Melihat semua pages yang sudah di buat berdasarkan chapter
exports.getPages = (req, res) => {
    comicDetail.findAll({
        include : [{
            model : episodes
        }],
        where : {
            comic : req.params.comicId,
            chapter_id : req.params.episode_id
        }
    }).then(ep => res.send(ep[0]["episodes"])).catch(err => console.log(err))
}

// Delete Pages dari suatu chapter
exports.deletePages = (req, res) => {
    episodes.destroy({
        where : {
            title_id : req.params.episode_id,
            pages : req.params.image_id
        }
    })
    .then(comic => {
        res.send({
            message : "success",
            comic
        })
    })
}