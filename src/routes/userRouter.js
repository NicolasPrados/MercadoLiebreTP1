const express = require ("express");
const path = require("path")
const router = express.Router();
const multer = require("multer")
const controller = require("../controllers/userController")

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

// HOMES
router.get("/login", controller.login) //terminado
router.post("/perfil", controller.perfil) //ir al perfil // terminado
// USER REGISTER
router.get("/register", controller.register)
router.post("/register",fileUpload.single("foto"), controller.processRegister)

// USER EDIT
router.get("/edit/:id", controller.perfilEdit) //ver los datos del perfil para editar // terminado
router.put("/edit/:id",fileUpload.single("foto"), controller.perfilEditProcess) //terminado

// USER DELETE
router.delete("/delete/:id", controller.deleteProcess) // terminado

module.exports = router