import Router from "express"; // Importation du Router d'Express
import {
    getAll,       // Fonction pour récupérer toutes les catégories
    getById,      // Fonction pour récupérer une catégorie par ID
    create,       // Fonction pour créer une nouvelle catégorie
    update,       // Fonction pour mettre à jour une catégorie existante
    remove,       // Fonction pour supprimer une catégorie
    getStat       // Fonction pour récupérer le nombre de catégories
} from "../controllers/category.js"; // Importation des fonctions de contrôleur
import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

const router = Router(); // Création d'un nouvel objet Router

// Définition des routes
router.get("/list", getAll); // Route pour récupérer toutes les catégories
router.get("/stat", withAdminAuth, getStat); // Route pour récupérer le nombre de catégorie
router.get("/:id", withAuth, getById);  // Route pour récupérer une catégorie par ID

router.post("/create", withAdminAuth, create); // Route pour créer une nouvelle catégorie (protégée par auth)
router.patch("/update/:id", withAdminAuth, update); // Route pour mettre à jour une catégorie (protégée par auth)
router.delete("/delete/:id", withAdminAuth, remove); // Route pour supprimer une catégorie (protégée par auth)

export default router; // Exportation des routes
