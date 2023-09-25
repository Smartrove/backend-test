const { body } = require("express-validator");

const isValidEmailFormat = (value) => {
  // Define a regular expression for email validation
  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailFormat.test(value);
};
const isValidPasswordFormat = (value) => {
  // Define a regular expression for email validation
  const passwordFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  return passwordFormat.test(value);
};

// Define validation rules for login route
const loginValidation = [
  body("email")
    .custom((value) => {
      if (!isValidEmailFormat(value)) {
        throw new Error("Invalid email format");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Email is required or invalid email"),

  body("password")
    .custom((value) => {
      if (!isValidPasswordFormat(value)) {
        throw new Error(
          "password should contain at least one capital letter, special character and number and it should not be less than 6 characters"
        );
      }
      return true;
    })
    .notEmpty()
    .withMessage("Password is required"),
];

const signUpValidations = [
  body("username").notEmpty().withMessage("Username is required"),
  body("fullname").notEmpty().withMessage("fullname is required"),
  body("dob").notEmpty().withMessage("date of birth is required"),
  body("password")
    .custom((value) => {
      if (!isValidPasswordFormat(value)) {
        throw new Error(
          "password should contain at least one capital letter, special character and number and it should not be less than 6 characters"
        );
      }
      return true;
    })
    .notEmpty()
    .withMessage("Password is required"),
  body("email")
    .custom((value) => {
      if (!isValidEmailFormat(value)) {
        throw new Error("Invalid email format");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Email is required or invalid email"),
];
const createDonationValidations = [
  body("user_id").notEmpty().withMessage("User ID is required"),
  body("receiver_id").notEmpty().withMessage("receiver ID is required"),
  body("donatedAmount").notEmpty().withMessage("donated amount is required"),
];
const createTransactionPinValidations = [
  body("user_id").notEmpty().withMessage("User ID is required"),
  body("pin").notEmpty().withMessage("pin is required"),
];
const createWalletValidations = [
  body("user_id").notEmpty().withMessage("User ID is required"),
];

module.exports = loginValidation;
module.exports = signUpValidations;
module.exports = createDonationValidations;
module.exports = createTransactionPinValidations;
module.exports = createWalletValidations;
