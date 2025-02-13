import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { Router } from "express";

const router = Router();
const saltRound = 10;

function isValidPassword(password) {
  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[^A-Za-z0-9]/;

  return (
    minLength.test(password) &&
    upperCase.test(password) &&
    number.test(password) &&
    specialChar.test(password)
  );
}

router.post("/add", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "missing the input field" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
      });
    }

    const hash = await bcrypt.hash(password, saltRound);
    const user = await userModel.create({ email, password: hash });
    res.status(201).json({ message: "user create successfully " });
  } catch (err) {
    console.log("There is an error while add the data in the database ", err);
    res.status(500).json({
      message: "There is an error while adding the user in the database",
    });
  }
});

export default router;
