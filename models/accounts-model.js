const pool = require('../config/database');

class AccountsModel {
    static getAccounts = async () => {
        const [result] = await pool.query("select * from Accounts");
        return result;
      };
      
      static getAccount = async (id) => {
        const [result] = await pool.query(`select * from Accounts where id=? `, [id]);
        return result[0];
      };
      
      static insertAccount = async (name,userId,isDefault) => {
        const [result] = await pool.query("insert into accounts (name, user_id, is_default) values (?,?,?)", [
          name,userId, isDefault
        ]);
        return result;
      };
      
      static updateAccount = async (id, name,isDefault) => {
        const [result] = await pool.query(
          `
           update accounts set name = ? , is_default = ? where id = ?`,
          [name,isDefault, id]
        );
        return result;
      };
      
      static deleteAccount = async (id) => {
        const result = pool.query("delete from Accounts where Id = ?", [id]);
        return id
      };
      
      static callStoredProcedure = async(id)=>{
          const [result] = await pool.query('call sp_select (?)' , [id])
          return result[0]
      }
}

module.exports = AccountsModel