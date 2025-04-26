import { Router } from 'express';

import article_routes from './article.routes.js';
import category_routes from './category.routes.js';
import auth_routes from './auth.routes.js';
import comment_routes from './comment.routes.js';
import reaction_routes from './reaction.routes.js';
import media_routes from './media.routes.js';
import user_routes from './user.routes.js';
import withAuth from '../middlewares/withAuth.js';

const router = Router();

// router.get("/", (req, res) => {
//     res.json({ msg: "Ton back marche imbécile ! keep it up !" });
// });

// Routes pour les utilisateurs
router.use('/article', article_routes);
router.use('/category', category_routes);
router.use('/auth', auth_routes);
router.use('/comment', withAuth, comment_routes);
router.use('/reaction', withAuth ,reaction_routes);
router.use('/media', media_routes);
router.use('/user', user_routes);


router.get('*',(req,res)=>{
  res.status(404).json({msg:'page non trouvée'})
});

export default router;
