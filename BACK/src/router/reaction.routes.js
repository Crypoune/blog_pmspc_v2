import Router from "express";
import {
    addReaction,
    getReactionsByArticle,
    //getReactionsUserByArticle,
    //updateReaction,
    //removeReaction,
    //countReactionsByArticle,
    getStat
} from "../controllers/reaction.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

const router = Router();

router.post("/add", withAuth ,addReaction);  // Ajouter une réaction
router.get("/stat", withAdminAuth, getStat);  // Compter les réactions
router.get("/:id_article", getReactionsByArticle);  // Récupérer toutes les réactions pour un article
// router.patch("/:id_reaction", withAuth ,updateReaction);  // Mettre à jour une réaction
// router.delete("/:id_reaction", withAuth ,removeReaction);  // Supprimer une réaction
// router.get("/count/:id_article", countReactionsByArticle);  // Récupérer la synthèse des réactions pour un article
// router.get("/:id_user/:id_article", getReactionsUserByArticle);  // Récupérer toutes les réactions pour un article

export default router;
