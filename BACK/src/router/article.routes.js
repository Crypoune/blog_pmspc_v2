import Router from "express";

import {
    getReactAll,
    getById,
    getRecent,
    create,
    update,
    remove,
    getStat
} from "../controllers/article.js";  // Contrôleur pour les articles
import { addMedia } from "../controllers/media.js";  // Contrôleur pour les images/médias secondaires
import { addComment } from "../controllers/comment.js";  // Contrôleur pour les commentaires
import withAuth from "../middlewares/withAuth.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();

// Routes pour les articles
router.get("/alist", getReactAll);  // Récupérer tous les articles avec réactions
router.get("/stat", withAdminAuth, getStat);
router.get("/recent/:nb", getRecent);  // Récupérer les n articles les plus récents
router.get("/:id", getById);  // Récupérer un article par ID

// Route pour créer un article
router.post("/create", withAdminAuth, create);

// Remplacé `addImage` par `addMedia` pour correspondre à la gestion des médias
router.post("/:id/addMedia", withAdminAuth, addMedia);

// Route pour ajouter un commentaire à un article
router.post("/:id/addComment", withAuth, addComment);

// Route pour mettre à jour un article
router.patch("/update/:id", withAdminAuth, update);

// Route pour supprimer un article
router.delete("/delete/:id", withAdminAuth, remove); 

export default router;
