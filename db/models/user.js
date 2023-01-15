const db = require("..");
const bcrypt = require("bcrypt");
const DbError = require("../error");
// user model
class User {
    constructor(uid, name, email, passcode, phrase) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.passcode = passcode;
        this.phrase = phrase;
    }

    save() {
        const crypted_passcode = bcrypt.hashSync(this.passcode, 10);
        const crypted_phrase = bcrypt.hashSync(this.phrase, 10);

        const sql = `INSERT INTO users (uid, name, email, passcode, phrase) VALUES ('${this.uid}','${this.name}', '${this.email}', '${crypted_passcode}', '${crypted_phrase}')`;
        db.connection.query(sql, (err, result) => {
          if (err) {
            switch (err.code) {
              case "ER_DUP_ENTRY":
                throw new DbError("DUP_UID");
              default:
                throw err;
            }
          }
        });
    }

    static fetchAll() {
        const sql = `SELECT * FROM users`;
        return db.connection.query(sql
            , (err, result) => {
                if (err) throw err;
            }
        ).values;
    }

}

module.exports = User;