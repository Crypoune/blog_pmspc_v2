import Router from "express";
import {
  addComment,
  getAllFromArticleId,
  getStat
} from "../controllers/comment.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

const router = Router();

router.get("/getall/:id", withAuth, getAllFromArticleId);
router.get("/stat", withAdminAuth, getStat);
router.post("/create", withAuth, addComment);

export default router;
