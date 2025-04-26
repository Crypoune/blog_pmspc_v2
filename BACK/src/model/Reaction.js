import pool from "../config/db.js";

class Reaction {
  // Récupérer le nombre de catégories
  static async stat() {
    const COUNT_ALL = `
      SELECT
        COUNT(*) 'nbReactions'
      FROM reaction
    `;
    return await pool.query(COUNT_ALL);
  }

  // Trouver toutes les réactions pour un article donné
  static async findByArticleId(articleId) {
    const SELECT = `
            SELECT id_article, id_user, reaction_type 
            FROM reaction 
            WHERE id_article = ?
        `;
    return await pool.query(SELECT, [articleId]);
  }

  // Trouver toutes les réactions d'un utilisateur donné
  static async findByUserId(userId) {
    const SELECT = `
            SELECT id_user, id_article, reaction_type 
            FROM reaction 
            WHERE id_user = ?
        `;
    return await pool.query(SELECT, [userId]);
  }

  // Ajouter une nouvelle réaction
  static async addReaction(id_user, id_article, reaction_type) {
    const INSERT = `
            INSERT INTO reaction (id_user, id_article, reaction_type) 
            VALUES (?, ?, ?)
        `;
    return await pool.execute(INSERT, [id_user, id_article, reaction_type]);
  }

  // Mettre à jour une réaction existante
  static async updateReaction(id_user, id_article, newReactionType) {
    const UPDATE = `
            UPDATE reaction 
            SET reaction_type = ? 
            WHERE id_user = ? and id_article = ?
        `;
    return await pool.execute(UPDATE, [newReactionType, id_user, id_article]);
  }

  // Supprimer une réaction
  static async removeReaction(id_user, id_article) {
    const DELETE = `
            DELETE 
            FROM reaction 
            WHERE id_user = ? and id_article = ?
        `;
    return await pool.execute(DELETE, [id_user, id_article]);
  }

  // Supprimer les réactions d'un utilisateur
  static async removeUserReaction(id_user) {
    const DELETE = `
              DELETE 
              FROM reaction 
              WHERE id_user = ?
          `;
    return await pool.execute(DELETE, [id_user]);
  }

  // Supprimer les réactions d'un article
  static async removeArtReaction(id_article) {
    const DELETE = `
              DELETE 
              FROM reaction 
              WHERE id_article = ?
          `;
    return await pool.execute(DELETE, [id_article]);
  }

  // Compter le nombre de réactions pour un article donné
  static async countReactionsByArticleId(articleId) {
    const COUNT = `
            SELECT 
            reaction_type AS type, 
            COUNT(*) as count FROM reaction 
            WHERE id_article = ? 
            GROUP BY reaction_type
        `;
    return await pool.query(COUNT, [articleId]);
  }
}

export default Reaction;
