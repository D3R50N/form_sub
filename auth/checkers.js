const db = require("../db");
const DbError = require("../db/error");
const {
  DUP_UID,
  DUP_EMAIL,
  INVALID_UID,
  INVALID_EMAIL,
  INVALID_PASSCODE,
  INVALID_PHRASE,
} = require("./errors");

async function check_duplicate_uid(uid) {
  const sql = `SELECT uid FROM users WHERE uid = '${uid}'`;
  const result = await db.connection.awaitQuery(sql);
  if (result.length > 0) {
    throw new DbError(DUP_UID);
  }
}

async function check_duplicate_email(email) {
  const sql = `SELECT email FROM users WHERE email = '${email}'`;

  const result = await db.connection.awaitQuery(sql);
  if (result.length > 0) {
    throw new DbError(DUP_EMAIL);
  }
}

async function check_invalid_uid(uid) {
  const sql = `SELECT uid FROM users WHERE uid = '${uid}'`;
  const result = await db.connection.awaitQuery(sql);
  if (result.length == 0) {
    throw new DbError(INVALID_UID);
  }
}

async function check_invalid_email(email) {
  const sql = `SELECT email FROM users WHERE email = '${email}'`;
  const result = await db.connection.awaitQuery(sql);
  if (result.length == 0) {
    throw new DbError(INVALID_EMAIL);
  }
}

async function check_invalid_passcode(uid, passcode) {
  const sql = `SELECT passcode FROM users WHERE uid = '${uid}'`;
  const pass = await db.connection.awaitQuery(sql);
  if (!bcrypt.compareSync(passcode, pass)) {
    throw new DbError(INVALID_PASSCODE);
  }
}

async function check_invalid_phrase(uid, phrase) {
  const sql = `SELECT phrase FROM users WHERE uid = '${uid}'`;
  const pass = await db.connection.awaitQuery(sql);
  if (!bcrypt.compareSync(phrase, pass)) {
    throw new DbError(INVALID_PHRASE);
  }
}

module.exports = {
  check_duplicate_uid,
  check_duplicate_email,
  check_invalid_uid,
  check_invalid_email,
  check_invalid_passcode,
  check_invalid_phrase,
};
