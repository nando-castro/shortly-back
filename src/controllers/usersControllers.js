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
    const { user } = res.locals;
    const createdAt = daysjs().format("YYYY-MM-DD HH:mm:ss");

    console.log(user);

    if (user) {
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      const sessionUser = await connection.query(
        `SELECT * FROM sessions WHERE "userId" = $1`,
        [user.id]
      );

      if (sessionUser.rows.length > 0) {
        await connection.query(
          `UPDATE sessions SET token = $1 WHERE "userId" = $2`,
          [token, user.id]
        );
        return res.status(200).send(token);
      }
      await connection.query(
        `INSERT INTO sessions ("token", "userId", "createdAt") VALUES($1, $2, $3)`,
        [token, user.id, createdAt]
      );
      res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getUrlsUser(req, res) {
  try {
    const { token } = res.locals;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { rows: users } = await connection.query(
      `SELECT u.id, u.name, SUM(l."views") as "visitCount"
      FROM users u
      JOIN links l ON l."userId" = u.id
      WHERE u.id = $1
      GROUP BY u.id`,
      [data.id]
    );
    const { rows: links } = await connection.query(
      `SELECT l.id, l."shortLink" AS "shortUrl", l."link" AS "url", l."views" AS "visitCount" FROM "links" l WHERE "userId" = $1`,
      [data.id]
    );
    const [user] = users;

    res
      .status(200)
      .send({
        id: user.id,
        name: user.name,
        visitCount: user.visitCount || 0,
        shortenedUrls: links,
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
