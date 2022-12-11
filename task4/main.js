const express = require('express')
const itemRoutes = require('./routes/items')
const port = process.env.NODE_PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/items', itemRoutes)
app.listen(port, () => {
    console.log('app is running on port ' + port)
})