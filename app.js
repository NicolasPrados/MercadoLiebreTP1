const express = require("express")
const path = require("path")

const app = express()

const publicPath = path.join(__dirname, "./public") // app.use(express.static('public')) es otra opcion
app.use(express.static(publicPath))


app.listen(3000, () => console.log("Servidor en puerto 3000 corriendo"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"))
})