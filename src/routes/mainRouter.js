const express = require ("express");
const router = express.Router();
const multer = require("multer")
const controller = require("../controllers/mainController")

const fileUpload = require('../middlewares/multerMiddleware');

router.get("/", controller.index)

module.exports = router