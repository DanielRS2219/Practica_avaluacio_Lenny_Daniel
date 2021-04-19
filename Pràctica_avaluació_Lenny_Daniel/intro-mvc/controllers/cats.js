
const cats = require('../models/cats')

exports.getAllCats = (req, res) => {  

    // el controlador va a obtener todos los datos del modelo 'cats'
    const allCats = cats.findAll()

    for (let i = 0; i < allCats.length; i++) {
        allCats[i].name = allCats[i].name.toUpperCase()
    }

    const orderAllcats = allCats.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

    res.render('cats/index', {cats: orderAllcats})
}

exports.getFilteredCats = (req, res) => {

    // obtengo la raza de la QueryString
    const date = req.query.date

    // es el controlador que se encarga de manipular y filtrar los datos. 
    const filteredCats = cats.findAll().filter(cat => {
        return cat.date.toLowerCase() == date.toLowerCase()
    })

    res.render('cats/index', {cats: filteredCats, race: date})
}

exports.getAddCat = (req, res) => {

    res.render('cats/add-img', {error: 'null'})
}

exports.postAddCat = (req, res) => {
    // recibir los datos del POST
    const name = req.body.name
    const url = req.body.url
    const date = req.body.date

    if (checkImageExists(url)){
        //renderizar de nuevo la vista del formulario, pero pasadole una variable indicando que la url ya existe  
        var error = url;
        res.render('cats/add-img', {error: error})
        return
    }

    // insertar el nuevo gato en la BBDD
    cats.addCat(name, url, date)

    // redirigir al cliente a la lista de gatos
    res.redirect('/cats')
}

function checkImageExists(url) {
    // el controlador va a obtener todos los datos del modelo 'cats'
    const allCats = cats.findAll()
    for (let i = 0; i < allCats.length; i++) {
        
        if (allCats[i].url.includes(url)){
            return true
        }
    }
    return false
}