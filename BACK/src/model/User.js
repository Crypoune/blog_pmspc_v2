import pool from "../config/db.js";
import Reaction from "./Reaction.js";
import Comment from "./Comment.js";

class User {
  // Récupérer le nombre d'utilisateurs
  static async stat() {
    const COUNT_ALL = "SELECT COUNT(*) 'nbUsers' FROM user";
    return await pool.query(COUNT_ALL);
  }
  // Récupérer toutes les informations des utilisateurs
  static async findAll() {
    const SELECT_ALL = "SELECT id, username, email, role, status FROM user";
    return await pool.query(SELECT_ALL);
  }

  // Récupérer les informations d'un utilisateur spécifique
  static async findOneName(name) {
    const FIND_ONE_NAME =
      "SELECT id, username, email, role, status FROM user WHERE username = ?";
    return await pool.execute(FIND_ONE_NAME, [name]);
  }

  // Récupérer les informations d'un utilisateur spécifique
  static async findOne(id) {
    const FIND_ONE =
      "SELECT id, username, email, role, status FROM user WHERE id = ?";
    return await pool.execute(FIND_ONE, [id]);
  }

  // Mettre à jour les informations d'un utilisateur (par exemple : email, rôle, etc.)
  static async update(id, data) {
    const UPDATE =
      "UPDATE user SET username = ?, email = ?, role = ?, status = ? WHERE id = ?";
    return await pool.execute(UPDATE, [
      data.username,
      data.email,
      data.role,
      data.status,
      id,
    ]);
  }

  // Supprimer un utilisateur
  static async delete(id) {
    // Suprimer les réactions de l'utilisateur
    removeUserReaction(id);
    // Affecter les commentaires de l'utilisateur à l'utilisateur "Anonyme" (id=1)
    anonymUserComment(id);
    const DELETE = "DELETE FROM user WHERE id = ?";
    return await pool.execute(DELETE, [id]);
  }
}

export default User;
