const express = require('express');
const { items: itemsDb } = require('./../utils/db')
const router = express.Router();

router.get('/fetchAll', (req, res) => {
    res.send({ success: true, items: itemsDb })
})

router.post('/create', (req, res) => {
    let item = req.body
    let valid = true
    if (valid) {
        itemsDb.push({ ...item, id: itemsDb.length + 1 })
        res.send({ success: true, item: item })
    } else {
        res.send({ 'success': false, message: 'validation failed' })
    }
})
router.put("/update/:id", (req, res) => {

    let id = req.params.id
    let item = req.body
    if (isNaN(id)) {
        throw new Error('Id is null');
    }
    itemsDb.map(obj => {
        return id == obj.id ? item : obj
    })
    res.send({ success: true, item: item })
})

router.delete("/delete/:id", (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        throw new Error('Id is null');
    }
    itemsDb.forEach((item, index) => {
        if (item.id == id) {
            itemsDb.splice(index, 1);
        }
    })
    console.log(itemsDb)
    res.send({ sucess: true, items: itemsDb })
})

router.get("/findById/:id", (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        throw new Error('Id is null');
    }
    const result = itemsDb.find(item => item.id == id)
    if (result) {
        res.send({ sucess: true, item: result })

    } else {
        res.send({ success: false, messsage: "Item is not found" })

    }
})

module.exports = router;