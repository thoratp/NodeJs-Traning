const express = require('express');
const router = express.Router();
const data = [{
    item: 'mobile',
    price: 3000
}, {
    item: 'laptop',
    price: 40000
}, {
    item: 'bike',
    price: 60000
}]

var username = ''
var password = ''

router.get("/user/login", (req, res) => {
    res.render("login", { errorMsg: '' });
});

router.get("/items", (req, res) => {
    res.render('items', { welcomeMsg: `welcome to app`, items: '' })
});

router.post("/login", (req, res) => {
    username = req.body.username
    password = req.body.password
    if (username == "admin" && password == 'admin@123') {
        res.render('items', { welcomeMsg: `welcome to app ${req.body.username}`, data: data })
    } else {
        res.render('login', { errorMsg: "username and password is not correct or it is empty" })
    }
});

router.get("/items/:item/:price", (req, res) => {

    if (username == "admin" && password == 'admin@123') {
        res.render('invoice', { item: req.params.item, price: req.params.price, errorMsg: '', user: username })
    } else {
        res.render('invoice', { item: '', errorMsg: "user is not logged-In" })
    }
});

module.exports = router;