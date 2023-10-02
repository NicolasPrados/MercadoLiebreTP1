const express = require ("express");
const router = express.Router();
const path = require("path")
const multer = require("multer")
const controller = require("../controllers/productController")

const albumController = require("../controllers/albumController")

const fileUpload = require('../middlewares/multerMiddleware');

router.get("/create", controller.create)
router.post("/create", fileUpload.single("image"), controller.createProcess) //terminado

router.get("/listado", controller.listaProd)
router.post("/edit", controller.detalleProdEditar)

router.put("/edit/:id",fileUpload.single("image"), controller.procesoEdicionProducto)
router.put("/recover/:id", controller.prodRecover)

router.get("/delete", controller.listaProdEliminar)
router.delete("/delete", controller.procesoProdEliminar)

// PRUEBA DB
router.get("/albums", albumController.list)

module.exports = router