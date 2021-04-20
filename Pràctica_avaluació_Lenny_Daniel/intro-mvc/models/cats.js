const BBDD_img = [{
    id: 1,
    name: 'Tach',
    url: 'https://wipy.tv/wp-content/uploads/2020/12/loki-1.jpg',
    date: '2020-01-01',
    predColor: ''
}, {
    id: 2,
    name: 'Loki',
    url: 'https://fotografias.antena3.com/clipping/cmsimages02/2020/02/03/70B7558E-8922-41D6-AF15-9C4BA00A9B60/58.jpg',
    date: '2018-10-20',
    predColor: ''
}, {
    id: 3,
    name: 'Canela',
    url: 'https://as.com/meristation/imagenes/2021/04/05/noticias/1617630043_282201_1617630184_noticia_normal_recorte1.jpg',
    date: '2019-03-14',
    predColor: ''
}]
const uuid = require('uuid')

exports.findAll = () => {
    return BBDD_img
}

exports.addCat = (name, url, date) => {
    const newCat =
    {
        id: uuid.v1(),
        name: name,
        url: url,
        date: date,
        predColor: ''
    }

    // El hecho de mantener en el modelo la manera que insertamos un nuevo registro en la BBDD; nos permite que si en el futuro nuestra BBDD cambia, solo tengamos que realizar las modificaciones en este fichero 
    
    // mongoDB.insert({name: name, race:race})
    BBDD_img.push(newCat)
}
