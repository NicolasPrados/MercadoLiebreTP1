const express = require ("express");
const path = require("path")
const router = express.Router();
const multer = require("multer")
const controller = require("../controllers/userController")

const fileUpload = require('../middlewares/multerMiddleware');
const validationRegister = require("../middlewares/validateRegisterMiddleware")
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

// HOMES
router.get("/login", controller.login) //terminado
router.post("/perfil", controller.perfil) //ir al perfil // terminado
// USER REGISTER    
router.get("/register", controller.register)
router.post("/register",fileUpload.single("foto"), validationRegister, controller.processRegister)

// USER EDIT
router.get("/edit/:id", controller.perfilEdit) //ver los datos del perfil para editar // terminado
router.put("/edit/:id",fileUpload.single("foto"), controller.perfilEditProcess) //terminado

// USER DELETE
router.delete("/delete/:id", controller.deleteProcess) // terminado

module.exports = router