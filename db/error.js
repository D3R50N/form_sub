
class DbError extends Error {
  constructor(code) {
    super();
    this.message = DbError.codes[code];
    this.code = code;
  }
  static codes = {
    DUP_UID: "Duplicate uid",
    DUP_EMAIL: "Duplicate email",
    INVALID_UID: "Invalid uid",
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSCODE: "Invalid passcode",
    INVALID_PHRASE: "Invalid passphrase",
  };
}

module.exports = DbError;
