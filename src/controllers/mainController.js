const productos = [
    {
        nombre: "Cafetera Moulinex",
        descuento: "40%",
        precio: 6.770,
        id: "imagen cafetera"

    },
    {

    },
    {

    },
    {

    }
]





module.exports = {

    index: (req, res) => {
        return res.render("home")
    },
    login: (req, res) => {
        return res.render("login")
    },
    register: (req, res) => {
        return res.render("register")
    }

}