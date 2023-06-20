const fs = require("fs")
const path = require ("path");
const rutaArchivo = path.resolve("./src/database/products.json")
const platos = JSON.parse(fs.readFileSync(rutaArchivo))

module.exports = {

    index: (req, res) => {

        const visitado = platos.filter(row => row.category == "visited" && row.borrado == false)
        const ofertado = platos.filter(row => row.category == "in-sale" && row.borrado == false)
        return res.render("home", {visita: visitado, oferta:ofertado})
    },

}