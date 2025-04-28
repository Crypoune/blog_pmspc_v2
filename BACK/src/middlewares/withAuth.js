export default (req, res, next) => {

  //return next(); // Pour dev
  // Vérification si l'utilisateur est authentifié
  if (req.session.user) {
    if (req.session.user.status === "active") {  // Vérifier bien "active"
      return next(); // Si l'utilisateur est authentifié, on continue
    } else {
      return res.status(403).json({ msg: "Compte désactivé" });
    }
  }

  // Sinon, on renvoie une erreur 401 (Unauthorized)
  res.status(401).json({ msg: "Unauthorized" });
};
