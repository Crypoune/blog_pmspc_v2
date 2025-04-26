import Router from "express";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import { getStat } from "../controllers/media.js";

const router = Router();

router.get("/stat", withAdminAuth, getStat);

export default router;
