import pool from "../config/db.js";

class Media {
  static async stat() {
    const COUNT_ALL = `
              SELECT
                  COUNT(*) 'nbMedias'
              FROM media
          `;
    return await pool.query(COUNT_ALL);
  }
  
  static async addImage(name, alt, id_article) {
    const INSERT_MEDIA = `
			INSERT INTO media (name, alt, id_article) 
			VALUES (?, ?, ?)
		`;
    return await pool.execute(INSERT_MEDIA, [name, alt, id_article]);
  }

  static async findByArticleId(articleId) {
    const SELECT_MEDIA = "SELECT * FROM media WHERE id_article = ?";
    return await pool.execute(SELECT_MEDIA, [articleId]);
  }

  static async findById(mediaId) {
    const SELECT_MEDIA = "SELECT * FROM media WHERE id = ?";
    return await pool.execute(SELECT_MEDIA, [mediaId]);
  }

  static async remove(mediaId) {
    const DELETE_MEDIA = "DELETE FROM media WHERE id = ?";
    return await pool.execute(DELETE_MEDIA, [mediaId]);
  }
}

export default Media;
