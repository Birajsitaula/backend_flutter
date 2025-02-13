import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("Server running successfully");
});
