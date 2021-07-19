// define master of variabel login 
const express = require("express")
const dashboard = express()
let { user_game, user_game_biodata } = require('../models')

//update edit data
dashboard.post('/dashboard-edit-save', (req,res) => {
    const {username, email} = req.body
    user_game.findOne({
        where: {
            id: req.params.id 
        }
    }).then((data) => {
        data.update({
            username: username,
            email: email
        }).then(() => {
            res.redirect('/dashboard')
        })
    })
})

module.exports = dashboard;