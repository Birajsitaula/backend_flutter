import express from "express";
import "dotenv/config";
import connection from "../models/index.js";
import userRouter from "../router/userRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connection.authenticate();
    await connection.sync();
    console.log("Server is created successfully");
  } catch (err) {
    console.log("There is an error while creating the server ", err);
  }
});
