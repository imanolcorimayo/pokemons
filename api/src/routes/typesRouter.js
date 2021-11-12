const { Router } = require('express');

// Importo funciones a usar en los métodos
const functions = require('./functions')

const typRouter = Router();

// Configurar los routers

typRouter.get('/', async (req, res) => {
    //Codigo:
    res.json(await functions.types())
})

module.exports = typRouter;