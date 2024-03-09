import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export default createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
