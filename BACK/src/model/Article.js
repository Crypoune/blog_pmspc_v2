import pool from "../config/db.js";

class Article {
  static async stat() {
    const COUNT_ALL = `
            SELECT
                COUNT(*) 'nbArticles'
            FROM article
        `;
    return await pool.query(COUNT_ALL);
  }

  static async findAll() {
    const SELECT_ALL = `
            SELECT
                id,
                title,
                content,
                publishDate,
                image,
                alt,
                id_category
            FROM article
        `;
    return await pool.query(SELECT_ALL);
  }

  static async findRecent(nb) {
    const SELECT_RECENT = `
            SELECT
                id,
                title,
                content,
                publishDate,
                image,
                alt,
                id_category
            FROM article
            ORDER BY publishDate DESC
            LIMIT ?
        `;
    return await pool.query(SELECT_RECENT, [nb]);
  }

  static async findReactAll() {
    const SELECT_REACT_ALL = `
                SELECT
                    article.id,
                    article.title,
                    article.content,
                    article.publishDate,
                    article.image,
                    article.alt,
                    article.id_category,
                                    user.username AS author, 
                    SUM(CASE WHEN reaction.reaction_type = 1 THEN 1 ELSE 0 END) AS nblike, 
                    SUM(CASE WHEN reaction.reaction_type = 2 THEN 1 ELSE 0 END) AS nblove 
                FROM article
                LEFT JOIN reaction ON article.id = reaction.id_article
                JOIN user ON article.id_user = user.id
                GROUP BY article.id, article.title
            `;
    return await pool.query(SELECT_REACT_ALL);
  }

  static async findInfoById(id) {
    const SELECT_INFO = `
                SELECT
                    article.id,
                    article.title,
                    article.content,
                    article.publishDate,
                    article.image,
                    article.alt,
                    article.id_category,
                    user.username AS author, 
                    SUM(CASE WHEN reaction.reaction_type = 1 THEN 1 ELSE 0 END) AS nblike, 
                    SUM(CASE WHEN reaction.reaction_type = 2 THEN 1 ELSE 0 END) AS nblove 
                FROM article
                LEFT JOIN reaction ON article.id = reaction.id_article
                JOIN user ON article.id_user = user.id
                WHERE article.id = ?
                GROUP BY article.id
            `;
    return await pool.execute(SELECT_INFO, [id]);
  }

  static async findById(id) {
    const SELECT_ONE = `
            SELECT 
                article.id, 
                article.title, 
                article.content, 
                article.publishDate, 
                article.image, 
                article.alt, 
                article.id_category, 
                user.username AS author, 
                category.name AS category, 
                COALESCE(JSON_ARRAYAGG(media.name), JSON_ARRAY()) AS media_files,
                COALESCE(JSON_ARRAYAGG(media.alt), JSON_ARRAY()) AS media_alts,
                COALESCE(r.nblike, 0) AS nblike,
                COALESCE(r.nblove, 0) AS nblove
            FROM article
            JOIN category ON article.id_category = category.id
            JOIN user ON article.id_user = user.id
            LEFT JOIN media ON article.id = media.id_article
            LEFT JOIN (SELECT
                id_article,
                SUM(CASE WHEN reaction_type = 1 THEN 1 ELSE 0 END) AS nblike,
                SUM(CASE WHEN reaction_type = 2 THEN 1 ELSE 0 END) AS nblove
                FROM reaction
                GROUP BY id_article) r ON article.id = r.id_article
            WHERE article.id = ?
            GROUP BY article.id
        `;
    try {
      const [rows] = await pool.execute(SELECT_ONE, [id]);
    } catch (error) {
      console.error("Erreur SQL:", error); // ✅ Capture l'erreur s'il y en a une
      throw error;
    }

    return await pool.execute(SELECT_ONE, [id]);
  }

  static async addMedia(name, alt, id_article) {
    const INSERT = `
            INSERT INTO media (name, alt, id_article) 
            VALUES (?, ?, ?)
        `;
    return await pool.execute(INSERT, [name, alt, id_article]);
  }

  static async create(datas) {
    //OK
    const INSERT = `
            INSERT INTO article (title, content, id_user, id_category, image, alt) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    return await pool.execute(INSERT, [
      datas.title,
      datas.content,
      datas.id_user,
      datas.id_category,
      datas.image,
      datas.alt,
    ]);
  }

  static async update(datas, id) {
    const UPDATE = `
            UPDATE article 
            SET title = ?, content = ?, image = ?, alt = ?, id_category = ?
            WHERE id = ?
        `;
    return await pool.execute(UPDATE, [
      datas.title,
      datas.content,
      datas.image,
      datas.alt,
      datas.id_category,
      id,
    ]);
  }

  static async remove(id) {
    const DELETE = `
            DELETE 
            FROM article 
            WHERE id = ?
        `;
    return await pool.execute(DELETE, [id]);
  }

  // Réaffecter les article de la catégorie à la catégorie "Divers" (id=1)
  static async moveArt(id_category) {
    const UPDATE = `
                UPDATE 
                article 
                SET id_category = 1
                WHERE id_category <=> NULL OR id_category = ?
            `;
    return await pool.execute(UPDATE, [id_category]);
  }
}

export default Article;
