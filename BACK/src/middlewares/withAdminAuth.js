export default (req, res, next) => {

  //return next(); // Pour dev
  // Vérification si l'utilisateur est authentifié et si son rôle est "admin"
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return next(); // L'utilisateur est admin, on continue donc vers la route suivante
  }

  // Si l'utilisateur n'est pas admin, renvoyer une erreur 403 (Forbidden)
  res.status(403).json({ msg: "Accès refusé : Privilèges administrateur requis." });
};