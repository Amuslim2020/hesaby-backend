const pool = require("../config/database");

class UserModel {
  static createUser = async (name, email, password) => {
    const [result] = await pool.query(
      `INSERT INTO users (id, name, email, password)
       VALUES (UUID(), ?, ?, ?)`,
      [name, email, password]
    );
    return result[0];
  };

  static getUserByEmail = async (email) => {
    const [result] = await pool.query("select * from users where email=?", [
      email,
    ]);
    return result[0];
  };
}

module.exports = UserModel;
