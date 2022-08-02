import connection from "../db/database.js";
import daysjs from "dayjs";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const createdAt = daysjs().format("YYYY-MM-DD HH:mm:ss");
    const passCrypt = bcrypt.hashSync(password, 10);
    await connection.query(
      `INSERT INTO "users" ("name", "email", "password", "createdAt") VALUES ($1, $2, $3, $4)`,
      [name, email, passCrypt, createdAt]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
