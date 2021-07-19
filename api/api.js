// define master of variabel login 
const express = require("express")
const api = express()
const { user_game } = require('../models')

api.use(express.json())

//read all data 
api.get('/api/v1/user', (req, res) => { 
    user_game.findAll({
        where:{
            isactive: true
        }
    })
    .then(user_game =>{
        res.status(200).json(user_game)
    })
})

//read by id 
api.get('/api/v1/user/:id', (req, res) => {
    user_game.findOne({
        where: { id: req.params.id }
    }).then(user_game => {
         res.status(200).json(user_game)
    })
})

//post 
// POST an article
api.post('/api/v1/user/posts', (req, res) => {
    const {username, front_name, last_name, age, email,password} = req.body 
    user_game.findAll({
        where: {
            username: username
        }
    }).then(function (usernameExist){
        if(usernameExist.length > 0){
            console.log('username already exist!')
            res.status(422).json("username already exist!")
        }else{
            user_game.create({
                username: username,
                password: password,
                email: email
            })
            .then(user_game => {
                user_game_biodata.create({
                    front_name: front_name,
                    last_name: last_name,
                    age: age,
                    user_id: user_game.get('id')
                })
            })
            res.status(201).json(user_game)
        }
    })
})

//update
// PUT an article
api.put('/api/v1/user/:id', (req, res) => {
    const {username, email,password} = req.body 
    user_game.findOne({
        where: {
            id: req.params.id
        }
    }).then((user_game) => {
        user_game.update({
            username: username,
            password: password,
            email: email
        }).then(user_game => {
            res.status(201).json(user_game)
        }) .catch(err => {
            res.status(422).json("Can't create article")
        })
    })
        
})

//destroy data
api.delete('/api/v1/user/:id', (req, res) => {
    let user_id = req.params.id
    user_game.destroy({
        where: { 
            id: user_id 
        }
    }).then(user_game => {
         res.status(200).json({
            message: `user dengan id ${req.params.id} berhasil dihapus`
         })
    }) .catch(err => {
         res.status(422).json("Can't create article")
    })
})

module.exports = api;