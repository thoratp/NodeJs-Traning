const express = require('express')
const port = process.env.PORT | 3000;
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(port, () => {
    console.log('app is running on port ' + port)
})