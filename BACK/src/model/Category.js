import pool from "../config/db.js"; // Assure-toi que le chemin est correct
import Article from "./Article.js";

class Category {
  // Récupérer le nombre de catégories
  static async stat() {
    const COUNT_ALL = `
      SELECT
        COUNT(*) 'nbCategories'
      FROM category
    `;
    return await pool.query(COUNT_ALL);
  }

  // Récupérer toutes les catégories
  static async findAll() {
    const SELECT_ALL = `
      SELECT * 
      FROM category 
      ORDER BY name ASC
    `;
    return await pool.query(SELECT_ALL);
  }

  // Récupérer une catégorie par son ID
  static async findById(id) {
    const SELECT_ONE = `
      SELECT * 
      FROM category 
      WHERE id = ?
    `;
    return await pool.execute(SELECT_ONE, [id]);
  }

  // create tag
  static async create(datas) {
    const INSERT = `
      INSERT INTO category (name) 
      VALUES (?)
    `;
    return await pool.execute(INSERT, [datas]);
  }

  // Mettre à jour une catégorie existante
  static async update(name, id) {
    const UPDATE = `
      UPDATE category 
      SET name = ? 
      WHERE id = ?
    `;
    return await pool.execute(UPDATE, [name, id]);
  }

  // Supprimer une catégorie
  static async remove(id) {
    // Affecter les articles à la catégorie "Divers" (id=1)
    const [response] = await Article.moveArt(id);
    const DELETE = `
      DELETE FROM category 
      WHERE id = ?
    `;
    return await pool.execute(DELETE, [id]);
  }
}

export default Category;
