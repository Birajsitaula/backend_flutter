import { Sequelize } from "sequelize";
import "dotenv/config";

const { DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export default sequelize;
