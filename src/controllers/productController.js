const { log } = require("console");
const fs = require("fs")
const path = require ("path");
const rutaArchivo = path.resolve("./src/database/products.json")
const productos = JSON.parse(fs.readFileSync(rutaArchivo))

module.exports = {

    create: (req, res) => {
        return res.render("formProductCreate")
    },
    createProcess: (req, res) => {
        const prodNuevo = {
            "id": productos.length+1,
            "name": req.body.name,
            "price": req.body.price,
            "discount": req.body.discount,
            "category": req.body.category,
            "description": req.body.description,
            "image": req.file.filename,
            "borrado": false
        }

        fs.writeFileSync(rutaArchivo, JSON.stringify([...productos, prodNuevo], null, 2), "utf-8")
        return res.redirect("/")
    },
    listaProd: (req, res) => {
        return res.render("listaProductos", {lista:productos})
    },
    detalleProdEditar: (req, res) => {

        const produEditable = productos.find(row => row.name == req.body.name)
        return res.render("formProductEdit", {miproducto:produEditable})
    },
    procesoEdicionProducto: (req, res) => {
        const produEditable = productos.find(row => row.id == req.params.id)

        produEditable.name = req.body.name,
        produEditable.price = req.body.price,
        produEditable.description = req.body.description
        produEditable.discount = req.body.discount
        produEditable.category = req.body.category


        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2), "utf-8")
        return res.redirect("/")
    },
    listaProdEliminar:(req, res) => {
        return res.render("listaProdEliminar", {lista:productos})
    },
    procesoProdEliminar:(req, res) => {
        const produEliminar = productos.find(row => row.name == req.body.name)
        produEliminar.borrado = true

        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2), "utf-8")
        return res.redirect("/")

    },
    prodRecover: (req, res) => {
        const produEditable = productos.find(row => row.id == req.params.id)

        produEditable.borrado = false
        
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2), "utf-8")
        return res.redirect("/")
    }
}