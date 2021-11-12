const { Router } = require('express');

// Importo funciones a usar en los métodos
const functions = require('./functions')

const PkmRouter = Router();

PkmRouter.get('/:id', async (req, res) => {
    var { id } = req.params;
    res.json(await functions.detailPkmId(id));
})

PkmRouter.get('/', async (req, res) => {

    if(typeof req.query.name === 'string') {
        res.json(await functions.detailPkmName(req.query.name));
    } else {
        res.json(await functions.firstReq()) // el await first.firstReq() devuelve el objeto.
    }

})

PkmRouter.post('/', async (req, res) => {
    const obj = req.body
    console.log(obj)
    res.json(await functions.createPkm(obj))
})

module.exports = PkmRouter;