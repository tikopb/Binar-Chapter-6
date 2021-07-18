/*
controller ini berfungsi sebagai routing page pada app
*/

//define master variabel
const express = require('express')
const router = express()


//rounting login & register start
router.get("/login", (req, res) => {
    res.render("login",{
        erorrMsg: ''
    })
    //next(); // -> jika tidak dilakukan fungsi next maka akan berhenti disini. 
});

router.get("/register", (req, res) => {
    res.render('register',{
        erorrMsg: ''
    })
});

router.get("/admin", (req, res, next) => {
    res.render("loginAdmin",{
        erorrMsg: ''
    })
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});


//rounting login & register end

//routing games start
router.get("/games", (req, res) => {
    const name = req.query.name || 'PLAYER 1'
    res.render('games', {
        name
    })
});
//routing games end

module.exports = router;