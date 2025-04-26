import pool from "../config/db.js";

class Auth {
  // Récupérer le nombre de sessions
  static async stat() {
    const COUNT_ALL = `
              SELECT
                  COUNT(*) 'nbSessions'
              FROM sessions
          `;
    return await pool.query(COUNT_ALL);
  }

  static async create(datas) {
    const INSERT =
      "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
    return await pool.execute(INSERT, [...Object.values(datas)]);
  }

  static async update(changePassword, hash, email, username) {
    if (changePassword) {
      const UPDATE =
        "UPDATE user SET password = ?, email = ? WHERE username = ?";
      return await pool.execute(UPDATE, [hash, email, username]);
    } else {
      const UPDATE = "UPDATE user SET email = ? WHERE username = ? ";
      return await pool.execute(UPDATE, [email, username]);
    }
  }

  static async findOneByUsername(username) {
    const SELECT = `
			SELECT id, username, password, email
			FROM user 
			WHERE username = ?
		`;
    return await pool.execute(SELECT, [username]);
  }

  static async findUserInfoById(id) {
    const SELECT = `
			SELECT username, role, id, email, created_date, status
			FROM user 
			WHERE user.id = ?
		`;
    return await pool.execute(SELECT, [id]);
  }
}

export default Auth;
