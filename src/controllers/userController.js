const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")


const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/users.json")));
const usuarioCambiarPass = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/passwords.json")));

module.exports = {

    login: (req, res) => {
        return res.render("login");
    },
    register: (req, res) => {

        return res.render("register");
    },
    processRegister: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render("register", { errors: resultValidation.mapped(), old: req.body });
        } else {

            const usuarioNuevo = {
                "id": usuarios.length + 1,
                "nombre": req.body.nombre,
                "nombreUsuario": req.body.nombreUsuario,
                "email": req.body.email,
                "fechaNacimiento": req.body.fechaNacimiento,
                "domicilio": req.body.domicilio,
                "perfil": req.body.perfil,
                "intereses": req.body.interes,
                "foto": req.file.filename,
                "contrasenia": bcrypt.hashSync(req.body.contrasenia, 10)
            }

            fs.writeFileSync(path.resolve(__dirname, "../database/users.json"), JSON.stringify([...usuarios, usuarioNuevo], null, 2), "utf-8")
            res.redirect("/")
        }
    },
    detallePerfil: (req, res) => {
        return res.render("perfil", { datos: req.session.usuarioLoggeado });
    },

    perfilLogin: (req, res) => {

        const usuarioPerfil = usuarios.find(row => row.email == req.body.email);

        if (usuarioPerfil) {
            let passCorrecta = bcrypt.compareSync(req.body.contrasenia, usuarioPerfil.contrasenia)
            if (passCorrecta) {

                /*delete*/ usuarioPerfil.contrasenia // borro la contraseña del usuario en la sesion por seguridad. Consultar por el delete, que no me encuentra pass

                req.session.usuarioLoggeado = usuarioPerfil

                if (req.body.recordame) {
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 })
                }

                return res.redirect("/user/perfil")
            }
        }
        return res.render("mensajeSinPerfil")
    },
    perfilEdit: (req, res) => {
        const usuarioPerfil = usuarios.find(row => row.id == req.params.id)
        return res.render("formUserEdit", { datosEdit: usuarioPerfil })
    },

    perfilEditProcess: (req, res) => {
        const usuarioPerfil = usuarios.find(row => row.id == req.params.id)

        /*for (let prop in req.body) {                  es una opcion
            usuarioPerfil[prop] = req.body[prop]
        }*/

        usuarioPerfil.nombre = req.body.nombre,
            usuarioPerfil.nombreUsuario = req.body.nombreUsuario,
            usuarioPerfil.email = req.body.email,
            usuarioPerfil.fechaNacimiento = req.body.fechaNacimiento,
            usuarioPerfil.domicilio = req.body.domicilio,
            usuarioPerfil.perfil = req.body.perfil,
            usuarioPerfil.interes = req.body.interes,


            fs.writeFileSync(path.resolve(__dirname, "../database/users.json"), JSON.stringify(usuarios, null, 2), "utf-8")
        res.redirect("/")


    },
    deleteProcess: (req, res) => {
        const usuarioPerfil = usuarios.find(row => row.id == req.params.id)

        usuarioPerfil.borrado = true

        fs.writeFileSync(path.resolve(__dirname, "../database/users.json"), JSON.stringify(usuarios, null, 2), "utf-8")
        res.redirect("/")
    },
    passwordChange: (req, res) => {
        const usuarioCambiarPass = req.session.usuarioLoggeado
        
        return res.render("changePassword", {usuario: usuarioCambiarPass})
    },
    passwordChangeProcess: (req, res) => {


        const datosUsuarioPass = usuarios.find(row => row.nombreUsuario == req.session.usuarioLoggeado.nombreUsuario)

        const usuarioPassVieja = {
            "nombreUsuario": req.session.usuarioLoggeado.nombreUsuario,
            "contrasenia": req.session.usuarioLoggeado.contrasenia
        }

        fs.writeFileSync(path.resolve(__dirname, "../database/passwords.json"), JSON.stringify([...usuarioCambiarPass, usuarioPassVieja], null, 2), "utf-8")

        datosUsuarioPass.contrasenia = bcrypt.hashSync(req.body.contraseniaNueva, 10)

        fs.writeFileSync(path.resolve(__dirname, "../database/users.json"), JSON.stringify(usuarios, null, 2), "utf-8")
        res.redirect("/")


    },
    logout: (req, res) => {
        res.clearCookie("userEmail") //destruye la cookie
        req.session.destroy(); //borra todo lo que este en sesion

        return res.redirect("/")
    }

}