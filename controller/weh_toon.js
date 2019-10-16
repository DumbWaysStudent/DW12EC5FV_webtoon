const models = require('../models')
const comics = models.comics
const user = models.users

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
