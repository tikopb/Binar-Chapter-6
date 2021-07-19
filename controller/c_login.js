/*
controller ini berfungsi sebagai middleware pada index.js dan logika page login dan register
1. login
2. register
3. login admin
*/

// define master of variabel login 
const express = require("express")
const login = express()
let { user_game, user_game_biodata } = require('../models')

//controller validation
//register 
login.post('/register', (req,res, next) => {
    const {username, front_name, last_name, age, email,password} = req.body 
    user_game.findAll({
        where: {
            username: username
        }
    }).then(function (usernameExist){
        console.log(usernameExist)
        if(usernameExist.length > 0){
            console.log('username already exist!')
            res.render('register',{
                erorrMsg: 'Username Already Exist'
            })
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
            res.render('login')
        }
    })
})


//login admin validatoin
login.post('/loginAdmin', (req,res) => {
    const {username, password} = req.body
    user_game.findOne({
        where: {
            username: username,
            password: password,
            isAdmin: true,
            isactive: true            
        }
    }).then((data) => {
        if(user_game.length !== null){
            res.redirect(`/dashboard?name=${data.get('username')}&id=${data.get('id')}`)  
        }else{
            console.log('username Or Password is Wrong')
            res.render('login',{
                erorrMsg: 'username Or Password is Wrong'
            })
        }
    })
})

//login validatoin
login.post('/login', (req,res) => {
    const {username, password} = req.body
    user_game.findOne({
        where: {
            username: username,
            password: password,
            isAdmin: false,
            isactive: true            
        }
    }).then((data) => {
        if(user_game.length !== null){
            res.redirect(`/games?name=${data.get('username')}&id=${data.get('id')}`)  
        }else{
            console.log('username Or Password is Wrong')
            res.render('login',{
                erorrMsg: 'username Or Password is Wrong'
            })
        }
    })
})

module.exports = login;