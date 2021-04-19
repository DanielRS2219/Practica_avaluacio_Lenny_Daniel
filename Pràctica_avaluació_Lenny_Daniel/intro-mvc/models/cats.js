const BBDD_cats = [{
    id: 1,
    name: 'Loki',
    race: 'Vulgaris'
}, {
    id: 2,
    name: 'Canela',
    race: 'Red'
}, {
    id: 3,
    name: 'Tach',
    race: 'Carey'
}]
const uuid = require('uuid')

exports.findAll = () => {
    return BBDD_cats
}

exports.addCat = (name, race) => {
    const newCat =
    {
        id: uuid.v1(),
        name: name,
        race: race
    }

    // El hecho de mantener en el modelo la manera que insertamos un nuevo registro en la BBDD; nos permite que si en el futuro nuestra BBDD cambia, solo tengamos que realizar las modificaciones en este fichero 
    
    // mongoDB.insert({name: name, race:race})
    BBDD_cats.push(newCat)
}
