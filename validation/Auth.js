import { check } from "express-validator";

const createUserValiation = [
  check("firstName").not().isEmpty().withMessage("Enter firstName correctly"),
  check("lastName").not().isEmpty().withMessage("Enter lastName correctly"),
  check("email").normalizeEmail().isEmail().withMessage("Enter valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be above 8 char"),
];

export default createUserValiation