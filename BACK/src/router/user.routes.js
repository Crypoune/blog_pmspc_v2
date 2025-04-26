import Router from "express";
import withAuth from "../middlewares/withAuth.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

import {
    getAllUsers,
    getStat,
    getUserById,
    getUserByName,
    updateUser,
    deleteUser
} from "../controllers/user.js";

const router = Router();

// Routes accessibles uniquement par les admins
router.get("/stat", withAdminAuth, getStat);
router.put("/update/:id", withAdminAuth, updateUser);
router.delete("/delete/:id", withAdminAuth, deleteUser);

// Routes accessibles par les utilisateurs authentifiés
router.get("/", withAdminAuth, getAllUsers);
router.get("/:id", withAuth, getUserById);
router.get("/name/:name", withAdminAuth, getUserByName);

export default router;
