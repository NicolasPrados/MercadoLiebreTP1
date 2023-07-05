const path = require('path');
const { body } = require('express-validator');
const fs = require('fs');

const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../database/users.json")));

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body("nombreUsuario").notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido').bail()
		.custom((value, { req }) => {
			
			let mailLog = req.body.email
			
			for (let i = 0; i < usuarios.length; i++) {
				if(usuarios[i].email == mailLog) {
					throw new Error('Ya existe un usuario registrado con ese email');
				}
			}
			return true
		}),
    body("domicilio").notEmpty().withMessage("Debes escribir tu domicilio"),
    body("perfil").notEmpty().withMessage("Debes seleccionar una opcion de perfil"),
	body('foto').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`); // template string
			}
		}
		return true;
	}),
    body('contrasenia').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body("confirmarcontrasenia").custom((value, { req }) => {
		let contraseñaIngresada = req.body.contrasenia

		if (!req.body.confirmarcontrasenia) {
			
			console.log(req.body.confirmarcontrasenia)
			throw new Error('Tienes que repetir la contraseña');
		} else if (req.body.confirmarcontrasenia && req.body.confirmarcontrasenia != contraseñaIngresada) {
			throw new Error('Tienes que repetir la contraseña que ya escribiste');
		} else {
			return true
		}
	})
]; 