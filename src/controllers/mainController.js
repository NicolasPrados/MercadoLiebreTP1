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