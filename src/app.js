const express = require("express")
const path = require("path")
const app = express()
const mainRouter = require("./routes/mainRouter")

app.use(express.static("public"))

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, () => console.log("Servidor en puerto 3000 corriendo"))

app.use(mainRouter)
