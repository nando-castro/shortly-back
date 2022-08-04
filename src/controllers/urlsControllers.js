import connection from "../db/database.js";
import { nanoid } from "nanoid";
import daysjs from "dayjs";
import jwt from "jsonwebtoken";

export async function createdShorthenUrl(req, res) {
  try {
    const { url } = req.body;
    const { token } = res.locals;
    const createdAt = daysjs().format("YYYY-MM-DD HH:mm:ss");
    const numChars = 8;

    const data = jwt.verify(token, process.env.JWT_SECRET);

    const session = await connection.query(
      `SELECT * FROM "sessions" WHERE "token" = $1`,
      [token]
    );

    if (session.rows.length === 0) {
      return res.sendStatus(401);
    }

    const shortLink = nanoid(numChars);

    await connection.query(
      `INSERT INTO links ("link", "shortLink", "userId", "createdAt") VALUES($1,$2,$3,$4)`,
      [url, shortLink, data.id, createdAt]
    );
    res.status(201).send(shortLink);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
