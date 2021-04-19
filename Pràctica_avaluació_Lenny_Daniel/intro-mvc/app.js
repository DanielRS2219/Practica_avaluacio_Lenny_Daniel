const express = require('express')
const app = express() 

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

const catsRoutes = require('./routes/cats')

app.use('/cats', catsRoutes) 

app.get('/', (req, res) => {
    res.send('Bienvenido a la página Web de PROGATS')
}) 

app.listen(3000)