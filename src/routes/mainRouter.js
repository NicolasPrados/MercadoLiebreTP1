const express = require ("express");
const router = express.Router();
const multer = require("multer")
const controller = require("../controllers/mainController")

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

router.get("/", controller.index)

module.exports = router