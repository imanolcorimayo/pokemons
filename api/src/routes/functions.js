const axios = require('axios');

// Importo sequelize.models.Pokemon
const { Pokemon, Tipo } = require('../db.js');

module.exports = {

    //obtener listado de pokemons desde pokeApi
    firstReq: async function() {

        // obtengo el nombre del pokemon y otra url para mas info
        var data = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40') //axios devuelve el objeto
        .catch(err => {
            resp = err
        })

        //Llamo la data restante => img & types.
        const pkmInfo = await Promise.all(data.data.results.map((element) =>{
            return axios.get("https://pokeapi.co/api/v2/pokemon/" + element.name)
        }))

        pkmInfo.forEach((el, i) => {
            data.data.results[i].types = []
            //no estoy conforme con esta doble anidación de bucles
            for (let j=0; j < el.data.types.length; j++) {
                data.data.results[i].types.push(el.data.types[j].type.name)
            }
            // el.data.types.forEach((el) => data.data.results[i].types.push(el.type.name))

            data.data.results[i].img =  el.data.sprites.other.dream_world.front_default
            data.data.results[i].lives = el.data.stats[0].base_stat
            data.data.results[i].force = el.data.stats[1].base_stat
            data.data.results[i].defense = el.data.stats[2].base_stat
            data.data.results[i].speed = el.data.stats[5].base_stat
            data.data.results[i].id = el.data.id
            data.data.results[i].height = el.data.height
            data.data.results[i].weight = el.data.weight

            delete data.data.results[i].url //elimino el dato url innecesario
        })

        // EJEMPLO DE LO QUE NO DEBO USAR

        // for (i=0; i<data.data.results.length; i++) {
        //     const pkmInfo = await axios.get("https://pokeapi.co/api/v2/pokemon/" + data.data.results[i].name)
        //     data.data.results[i].types = pkmInfo.data.types
        //     data.data.results[i].img =  pkmInfo.data.sprites.front_default
        //     delete data.data.results[i].url //elimino el dato url innecesario
        // }

        //Busco los existentes en base de datos
        
        const dataDB = await Pokemon.findAll({
            include: Tipo,
        })
        console.log("FROM DATA BASE: ", dataDB)

        let response = []
        if(!!dataDB[0]) {
            for (let i = 0; i < dataDB.length; i++) {
                let types = [];
                for(let j = 0; j < dataDB[i].tipos.length; j++) {
                    types.push(dataDB[i].tipos[j].name)
                }
                let aux = {
                    name: dataDB[i].name,
                    types: types,
                    img: "",
                    lives: dataDB[i].lives,
                    force: dataDB[i].strength,
                    defense: dataDB[i].defense,
                    speed: dataDB[i].speed,
                    id: dataDB[i].idpokemon,
                    height: dataDB[i].height,
                    weight: dataDB[i].weight,
                }
                response.push(aux)
            }
        }

        return [...data.data.results, ...response]
    },

    // Obtener detalle del pokemon particular por id
    detailPkmId: async function(id) {
        let response = {}
        const pkmInfo = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
        .catch(() => {
            return false
        })

        //Primero, si no existe en API buscamos en DB
        if (!pkmInfo) {
            const data = await Pokemon.findAll({
                where: {
                    idpokemon: id
                }
            })
            .catch(() => {
                return false
            })
            console.log(data)
            if(!data) return response.msg = 'No existe'
            response = data;
            return response
        }

        //Como si existe en API, filtramos información
        response.id = id;
        response.types = pkmInfo.data.types;
        response.img = pkmInfo.data.sprites.front_default;
        response.name = pkmInfo.data.name;
        response.stats = {
            lives: pkmInfo.data.stats[0].base_stat,
            speed: pkmInfo.data.stats[5].base_stat,
            strength: pkmInfo.data.stats[1].base_stat,
            defense: pkmInfo.data.stats[2].base_stat,
        };
        response.height = pkmInfo.data.height;
        response.weight = pkmInfo.data.weight;

        return response
    },

    // Obtener detalle del pokemon particular por nombre
    detailPkmName: async function(name) {
        let response = {}
        const pkmInfo = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
        .catch(() => {
            return false
        })

        //Primero, si no existe en API buscamos en DB
        if (!pkmInfo) {
            const data = await Pokemon.findOne({
                where: {
                    name: name
                }
            })
            if(!data) return response.msg = 'No existe'
            response = data;
            return response
        }

        //Si existe en API, filtramos información
        response.name = name;
        response.types = pkmInfo.data.types;
        response.img = pkmInfo.data.sprites.front_default;
        response.id = pkmInfo.data.id;
        response.stats = {
            lives: pkmInfo.data.stats[0].base_stat,
            speed: pkmInfo.data.stats[5].base_stat,
            strength: pkmInfo.data.stats[1].base_stat,
            defense: pkmInfo.data.stats[2].base_stat,
        };
        response.height = pkmInfo.data.height;
        response.weight = pkmInfo.data.weight;

        return response
    },

    // Crear un pokemon en DB
    createPkm: async function(data) {
        const {name,
            idpokemon,
            lives,
            strength,
            speed,
            defense,
            height,
            weight,
            types } = data

        const pokemon = await Pokemon.create({
            name,
            idpokemon,
            lives,
            strength,
            speed,
            defense,
            height,
            weight
        })

        // Relaciones con los tipos

        await pokemon.addTipos(types);

        return pokemon
    },
    types: async function() {


        let data = await Tipo.findAll()
        .catch(() => {
            return false
        })
        if (!data[0]) {

            // preticion a db// si existe algo ---> lo retorna// sino ---> lo pide a la api y guara en db
            let response = [];
            const pkmTypes = await axios.get("https://pokeapi.co/api/v2/type")
            .catch(() => {
                return false
            });
            if (!pkmTypes) return {msg: "Tipos de pokemons no encontrados"};

            // Mapeamos todas las peticiones create
            const typesPromises = pkmTypes.data.results.map((el, i) => {
                const type = Tipo.create({
                    name: el.name,
                    idtype: i
                })
                response[i] = pkmTypes.data.results[i].name;
                return type
            })

            // Ejecuto todo al mismo tiempo para que demore menos.
            const pkmtypes = await Promise.all(typesPromises)
            .then(() =>{
                return "creados con exito"
            })
            .catch((err) => {
                return "No pudieron ser creados los tipos"
            })

            console.log(pkmtypes)

            data = response;
        } else {
            let aux= data.map( el => el.name)
            data = aux
        }

        return data
    }
    
}