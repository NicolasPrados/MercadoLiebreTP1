const path = require('path');
const { body } = require('express-validator');
const fs = require('fs');
const bcrypt = require("bcryptjs");

const archivoPass = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/passwords.json")));

module.exports = [
	body('contrasenia')
		.notEmpty().withMessage('Debe ingresar su contraseña').bail()
		.custom((value, { req }) => {

			const usuarioAEvaluar = req.session.usuarioLoggeado
			const passDescifrada = bcrypt.compareSync(req.body.contrasenia, usuarioAEvaluar.contrasenia)

			if (!passDescifrada) {
				throw new Error('La contraseña ingresada no es correcta');
			}

			return true;

		}),

	body("contraseniaNueva")
		.notEmpty().withMessage('Debe ingresar su contraseña nueva').bail(),

	body('contraseniaNuevaRepetir')
		.notEmpty().withMessage('Debe repetir su contraseña nueva').bail()
		.custom((value, { req }) => {

			if(req.body.contraseniaNueva != req.body.contraseniaNuevaRepetir) {
				throw new Error('Las contraseñas nuevas no coinciden');
			}

			return true;

		}).bail()
		.custom((value, { req }) => {

			if(req.body.contraseniaNueva == req.body.contrasenia) {
				throw new Error('Debe ingresar una contraseña distinta de la actual');
			}

			return true;

		}).bail()
		.custom((value, { req }) => {

			const usuarioAEvaluar = req.session.usuarioLoggeado

			const passAModificar = archivoPass.find(row => row.nombreUsuario == usuarioAEvaluar.nombreUsuario && bcrypt.compareSync(req.body.contraseniaNueva, row.contrasenia))
			
			if (passAModificar) {
				throw new Error('La contraseña ingresada ya ha sido utilizada');
			}

			return true;

		})

];

