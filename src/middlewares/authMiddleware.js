function authMiddleware(req, res, next) {
	if (!req.session.usuarioLoggeado) {
		return res.redirect('/user/login');
	}
	next();
}

module.exports = authMiddleware;