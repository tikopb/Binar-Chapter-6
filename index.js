//define master of variabel
const express = require("express")

const app = express()
const fs = require("fs")
const port = 8081

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));// acess all public folder

//middleware 
// built in middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware start

const router = require('./routing/router')
const c_login = require('./controller/c_login')
const api = require('./api/api')
var users = require("./data/user.json")

app.use(router);
app.use(c_login);
app.use(api);
//middleware end 


//routing
//root page
app.get('/', (req, res) => {
    res.render('index'); //use for render file: 'view/index.ejs'
});

//erorr routing 
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        erorr: err.message
    })
})

//erorr handling internal server erorr handler
app.use(function(err,req,res,next){ 
    console.error(err)
    res.status(500).json({
        status:'fail',
        erorr:err.message
    }) 
})

// 404 handler
app.use(function (req, res) {
    res.status(404);
    res.render('404');
})

//create server start 
app.listen(port, '0.0.0.0', () => {
    console.log(`server run on = http://localhost:${port}`);
});