import { Router } from "express";
import { create, login, logout, getStat, update } from "../controllers/auth.js";
import withAuth from "../middlewares/withAuth.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();

// Vérification si l'utilisateur est connecté
router.get("/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ isLogged: true, user: req.session.user });
  } else {
    res.json({ isLogged: false });
  }
});

//router.get("/check-auth", check_auth);

router.post("/register", create);
router.post("/login", login);
router.post("/logout", withAuth, logout);
router.get("/stat", withAdminAuth, getStat);
router.patch("/update/:id", withAuth, update); // Route pour mettre à jour un utilisateur

export default router;
