/*
controller ini berfungsi sebagai middleware pada index.js dan logika page login dan register
1. login
2. register
3. login admin
*/

// define master of variabel login 
const express = require("express")
const login = express()
const { user_game, user_game_biodata } = require('../models')

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
    let user = null
    const {username, password} = req.body
    user = user_game.findAll({
        where: {
            username: username,
            password: password,
            isAdmin: true,
            isactive: true            
        }
    }).then(function (user){
        console.log(user)
        if(user.length !== 0){
            res.redirect('/dashboard')
        }else{
            console.log('username Or Password is Wrong')
            res.render('loginAdmin',{
                erorrMsg: 'username Or Password is Wrong'
            })
        }
    })
})

//login validatoin
login.post('/login', (req,res) => {
    let user = null
    const {username, password} = req.body
  
    // user = user_game.findOne({
    //     where: {
    //         username: username,
    //         password: password,
    //         isAdmin: false,
    //         isactive: true            
    //     }
    // });
    // .then((data) => {
    //     user = data;
    //     console.log(user)
    // });
    
    
    
    // if(user.length !== null){
    //     res.redirect(`/games `)
    // }else{
    //     console.log('username Or Password is Wrong')
    //     res.render('login',{
    //         erorrMsg: 'username Or Password is Wrong'
    //     })
    // }
})

module.exports = login;