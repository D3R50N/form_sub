const User = require("../db/models/user");
const {
  check_duplicate_uid,
  check_duplicate_email,
  check_invalid_uid,
  check_invalid_email,
  check_invalid_passcode,
  check_invalid_phrase,
} = require("./checkers");

function validate_password(password) {
  if (password.length < 8) {
    return false;
  }
  return true;
}

function validate_email(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validate_name(name) {
  if (name.length < 3) {
    return false;
  }
  return true;
}

async function validate_register(user) {
  const errors = [];
  if (!validate_password(user.passcode)) {
    errors.push(new Error("Password must be at least 8 characters long"));
  }
  if (!validate_email(user.email)) {
    errors.push(new Error("Invalid email"));
  }
  if (!validate_name(user.name)) {
    errors.push(new Error("Name must be at least 3 characters long"));
  }

  try {
    await check_duplicate_email(user.email);
  } catch (error) {
    errors.push(error);
  }

  try {
    await check_duplicate_uid(user.uid);
  } catch (error) {
    errors.push(error);
  }

  return errors;
}

async function validate_login(user, with_passcode = true) {
  const errors = [];
  if (!validate_password(user.passcode)) {
    errors.push(new Error("Password must be at least 8 characters long"));
  }
  if (!validate_email(user.email)) {
    errors.push(new Error("Invalid email"));
  }

  try {
    await check_invalid_email(user.email);
  } catch (error) {
    errors.push(error);
  }
  if (with_passcode) {
    try {
      await check_invalid_passcode(user.uid, user.passcode);
    } catch (error) {
      errors.push(error);
    }
  } else {
    try {
      await check_invalid_phrase(user.uid, user.phrase);
    } catch (error) {
      errors.push(error);
    }
  }
  return errors;
}

module.exports = {
  validate_register,
  validate_login,
};
