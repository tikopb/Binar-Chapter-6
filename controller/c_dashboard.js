// define master of variabel login 
const express = require("express")
const dashboard = express()
let { user_game, user_game_biodata } = require('../models')

//update edit data
dashboard.post('/dashboard-edit-save', (req,res) => {
    const {username, email} = req.body
    user_game.findOne({
        where: {
            id: req.query.id
        }
    }).then((user_game) => {
        user_game.update({
            username: username,
            email: email
        }).then(() => {
            res.redirect(`/dashboard`)
        })
    })
})

//destroy data
dashboard.get('/dashboard-delete', (req, res) => {
    let user_id = req.params.id
    user_game.findOne({
        where: {
            id: req.query.id
        }
    }).then((user_game) => {
        user_game.destroy({
            where: { 
                id: user_id 
            }
        }).then(() => {
            res.redirect(`/dashboard`)
        })
    })    
})

module.exports = dashboard;