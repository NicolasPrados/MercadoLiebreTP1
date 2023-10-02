const db = require("../database/models")

const Op = db.Sequelize.Op

module.exports = {
    list: async (req, res) => {
        try {
            const listadoAlbum = await db.Album.findAll()

            return res.render("pruebaDB", {album:listadoAlbum})
        }
        catch (error) {
            return console.log(error)
        }
    }
}