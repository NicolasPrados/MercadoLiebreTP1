const express = require ("express");
const router = express.Router();
const path = require("path")
const multer = require("multer")
const controller = require("../controllers/productController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, "../../public/images"))
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

let fileUpload = multer({ storage })

router.get("/create", controller.create)
router.post("/create", fileUpload.single("image"), controller.createProcess) //terminado

router.get("/listado", controller.listaProd)
router.post("/edit", controller.detalleProdEditar)

router.put("/edit/:id",fileUpload.single("image"), controller.procesoEdicionProducto)
router.put("/recover/:id", controller.prodRecover)

router.get("/delete", controller.listaProdEliminar)
router.delete("/delete", controller.procesoProdEliminar)

module.exports = router