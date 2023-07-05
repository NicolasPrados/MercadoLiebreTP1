const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const mainRouter = require("./routes/mainRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const userLoggedMiddleware = require("../src/middlewares/userLoggedMiddleware")
const cookies = require("cookie-parser"); // se guarda del lado del navegador

app.use(express.static("public"));  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "solo es un secreto",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware)

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, () => console.log("Servidor en puerto 3000 corriendo"));

app.use(mainRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);