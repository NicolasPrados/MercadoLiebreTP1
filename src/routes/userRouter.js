const express = require ("express");
const path = require("path")
const router = express.Router();
const multer = require("multer")
const controller = require("../controllers/userController")
const fileUpload = require('../middlewares/multerMiddleware');

const validationRegister = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware")
const valChangePassword1 = require("../middlewares/valChangePassword1")
const valChangePassword2 = require("../middlewares/valChangePassword2")


// HOMES
router.get("/login", guestMiddleware, controller.login) //terminado
router.get("/perfil", authMiddleware, controller.detallePerfil)
router.post("/perfil", controller.perfilLogin) //ir al perfil // proceso de login
// USER REGISTER    
router.get("/register", guestMiddleware, controller.register)
router.post("/register",fileUpload.single("foto"), validationRegister, controller.processRegister)

// USER EDIT
router.get("/edit/:id", controller.perfilEdit) //ver los datos del perfil para editar // terminado
router.put("/edit/:id",fileUpload.single("foto"), controller.perfilEditProcess) //terminado

//PASSWORD EDIT
router.get("/changepassword", controller.passwordChange)
router.put("/changepassword", valChangePassword1, valChangePassword2, controller.passwordChangeProcess)

// USER DELETE
router.delete("/delete/:id", controller.deleteProcess) // terminado

//LOG OUT
router.get("/logout", controller.logout)


module.exports = router