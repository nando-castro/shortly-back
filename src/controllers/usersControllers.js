import connection from "../db/database.js";
import daysjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const createdAt = daysjs().format("YYYY-MM-DD HH:mm:ss");

    const { rows: user } = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    const [usersInfo] = user;

    if (user.length === 0) {
      return res.sendStatus(401);
    }

    const comparePassword = bcrypt.compareSync(password, usersInfo.password);

    if (usersInfo && comparePassword) {
      const data = {
        name: usersInfo.name,
        email: usersInfo.email,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      const sessionUser = await connection.query(
        `SELECT * FROM sessions WHERE "userId" = $1`,
        [usersInfo.id]
      );

      if (sessionUser.rows.length > 0) {
        await connection.query(
          `UPDATE sessions SET token = $1 WHERE "userId" = $2`,
          [token, usersInfo.id]
        );
        return res.status(200).send(token);
      }
      await connection.query(
        `INSERT INTO sessions ("token", "userId", "createdAt") VALUES($1, $2, $3)`,
        [token, usersInfo.id, createdAt]
      );
      res.status(200).send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
