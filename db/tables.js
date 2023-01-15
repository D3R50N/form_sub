const db = require(".");
const DbError = require("./error");

function create_users_table() {
  const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uid VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        passcode VARCHAR(255) NOT NULL,
        phrase TEXT NULL
    )`;
  db.connection.query(sql, (err, result) => {
      if (err) {
          switch (err.code) {
              case "ER_DUP_ENTRY":
                  throw new DbError(DbError.codes.DUP_UID);
              default:
                  throw err;
          }
    };
    console.log("db : ", result);
  });
}




module.exports = {
    create_users_table,
}