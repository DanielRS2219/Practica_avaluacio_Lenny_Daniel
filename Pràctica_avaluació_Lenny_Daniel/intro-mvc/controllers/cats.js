
exports.getAllCats = (req, res) => {

    // el controlador va a obtener todos los datos del modelo 'cats'
    const allCats = cats.findAll()

    res.render('cats/index', {cats: allCats})
}

exports.getFilteredCats = (req, res) => {

    // obtengo la raza de la QueryString
    const race = req.query.race

    // es el controlador que se encarga de manipular y filtrar los datos. 
    const filteredCats = cats.findAll().filter(cat => {
        return cat.race.toLowerCase() == race.toLowerCase()
    })

    res.render('cats/index', {cats: filteredCats, race: race})
}

exports.getAddCat = (req, res) => {
    res.render('cats/add-cat')
}

exports.postAddCat = (req, res) => {
    // recibir los datos del POST
    const name = req.body.name
    const race = req.body.race

    // insertar el nuevo gato en la BBDD
    cats.addCat(name, race)

    // redirigir al cliente a la lista de gatos
    res.redirect('/cats')
}