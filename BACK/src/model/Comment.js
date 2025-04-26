import pool from "../config/db.js"; // Assure-toi que le chemin est correct

class Comment {
  // Récupérer le nombre de ommentaires
  static async stat() {
    const COUNT_ALL = `
            SELECT
                COUNT(*) 'nbComments'
            FROM comment
        `;
    return await pool.query(COUNT_ALL);
  }

  static async findAllFromArticleId(id) {
    const SELECT_ALL = `
            SELECT comment.id, id_user, id_article, content, comment.publishDate, username 
            FROM comment JOIN user ON comment.id_user = user.id 
            WHERE id_article = ? ORDER BY comment.publishDate
        `;
    return await pool.execute(SELECT_ALL, [id]);
  }

  static async addCommentToArticle(datas) {
    const INSERT = `
            INSERT INTO comment (content, id_article, id_user, publishDate) 
            VALUES (?,?,?, NOW())
        `;
    return await pool.execute(INSERT, [...Object.values(datas)]);
  }

  // Supprimer les réactions d'un utilisateur
  static async anonymUserComment(id_user) {
    const UPDATE = `
        UPDATE 
        comment 
        SET id_user = 1
        WHERE id_user <=> NULL OR id_user = ?
      `;
    return await pool.execute(UPDATE, [id_user]);
  }
}

export default Comment;
