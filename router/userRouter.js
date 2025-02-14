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
    res.status(201).json({ message: "user create successfully ", user });
  } catch (err) {
    console.log("There is an error while add the data in the database ", err);
    res.status(500).json({
      message: "There is an error while adding the user in the database",
    });
  }
});

// Read , update and delete soon
// Now , read the data from the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "missing the input field" });
    }
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user found successfully", user });
  } catch (err) {
    console.log(
      "There is an error while fetching the data from the database ",
      err
    );
    res.status(500).json({
      message: "There is an error while fetching the data from the database",
    });
  }
});

// now , update the data in the database
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!id || !email || !password) {
      return res.status(400).json({ message: "missing the input field" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
      });
    }

    const hash = await bcrypt.hash(password, saltRound);
    const user = await userModel.update(
      { email, password: hash },
      { where: { id } }
    );
    if (!user[0]) {
      return res.status(404).json({ message: "user not found" });
    }
    const updateUser = await userModel.findByPk(id);
    res.status(200).json({ message: "user updated successfully", updateUser });
  } catch (err) {
    console.log(
      "There is an error while updating the data in the database ",
      err
    );
    res.status(500).json({
      message: "There is an error while updating the user in the database",
    });
  }
});

// now , delete the data from the database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "missing the input field" });
    }
    const user = await userModel.destroy({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log(
      "There is an error while deleting the data from the database ",
      err
    );
    res.status(500).json({
      message: "There is an error while deleting the user from the database",
    });
  }
});

export default router;
