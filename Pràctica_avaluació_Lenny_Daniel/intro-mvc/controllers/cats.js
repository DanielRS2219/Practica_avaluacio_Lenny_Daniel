
const cats = require('../models/cats')
const prominent = require('color.js')
const AColorPicker = require('a-color-picker');
const colorableDominant = require('colorable-dominant')
//const splashy = require('splashy')()
var color = require('dominant-color')
const { getColorFromURL } = require('color-thief-node');

exports.getAllCats = (req, res) => {  

    // el controlador va a obtener todos los datos del modelo 'cats'
    const allCats = cats.findAll()

    for (let i = 0; i < allCats.length; i++) {
        allCats[i].name = allCats[i].name.toUpperCase();
        //allCats[i].predColor = prominent(allCats[i].url, { amount: 1 })
        //allCats[i].predColor = AColorPicker.from(allCats[i].url);
        //(async () => {
        //    const predominantColors = await splashy.fromUrl(allCats[i].url)
        //    const palette = colorableDominant(predominantColors) 
        //    console.log(palette)
        //})()
        //prominent.prominent(allCats[i].url, { amount: 1 }).then(color => {
        //    console.log(color) // [241, 221, 63]
        //  })
        //color(allCats[i].url, {format: 'rgb'}, function(err, color){
        //    console.log(color) // ['91', '108', '110']
        //  })
        (async () => { 
            allCats[i].predColor = await getColorFromURL(allCats[i].url);
            console.log(dominantColor)
        })();
    }

    const orderAllcats = allCats.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

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