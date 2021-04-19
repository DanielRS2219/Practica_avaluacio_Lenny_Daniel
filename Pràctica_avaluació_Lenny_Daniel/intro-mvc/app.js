const express = require('express')
const app = express() 

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


const catsRoutes = require('./routes/cats')

app.use('/cats', catsRoutes) 

app.get('/', (req, res) => {
    res.send('Welcome to your best Photo Gallery')
}) 

app.listen(3000)