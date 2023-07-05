function guestMiddleware(req, res, next) {
	if (req.session.usuarioLoggeado) {
		return res.redirect('/user/perfil');
	}
	next();
}

module.exports = guestMiddleware;