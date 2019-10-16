const jwt = require('jsonwebtoken')

const model = require('../models')
const user = model.users


// Api untuk Login
exports.login = (req, res) => {
    const name = req.body.name
    const password = req.body.password

    user.findOne({
        where : {
            name, password
        }
    }).then(user => {
        if(user){
            const token = jwt.sign({userId : user.id}, 'rahasia')
            res.status(200).send({
                username : user.name,
                userid : user.id,
                token
            })
        } else {
            res.send({
                error : true,
                message : 'Wrong Email Password'
            })
        }
    }).catch(error => console.log(error))
}