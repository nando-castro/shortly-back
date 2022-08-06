import connection from "../db/database.js";
import { nanoid } from "nanoid";
import daysjs from "dayjs";
import jwt from "jsonwebtoken";

export async function createdShorthenUrl(req, res) {
  try {
    const { url } = req.body;
    const { token } = res.locals;
    const createdAt = daysjs().format("YYYY-MM-DD HH:mm:ss");
    const numChars = 9;

    const data = jwt.verify(token, process.env.JWT_SECRET);

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

export async function getUrls(req, res) {
  try {
    const { id } = req.params;
    const { rows: link } = await connection.query(
      `SELECT l."id", l."shortLink" as "shortUrl", l."link" as "url" FROM links l WHERE "id" = $1`,
      [id]
    );
    res.status(200).send(link);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openShortLink(req, res) {
  try {
    const { shortLink } = req.params;
    const { rows: link } = await connection.query(
      `SELECT * FROM "links" WHERE "shortLink" = $1`,
      [shortLink]
    );
    const [url] = link;
    if (link.length === 0) {
      return res.sendStatus(404);
    }
    await connection.query(
      `UPDATE "links" SET "views" = "views" + 1 WHERE id = $1`,
      [url.id]
    );
    res.redirect(url.link);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  try {
    const { id } = req.params;
    const { token } = res.locals;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { rows: link } = await connection.query(
      `SELECT * FROM "links" WHERE "id" = $1`,
      [id]
    );
    const [url] = link;
    if (link.length === 0) {
      return res.sendStatus(404);
    }

    if (data.id === url.userId) {
      await connection.query(`DELETE FROM "links" WHERE id = $1`, [id]);
      return res.sendStatus(204);
    }
    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
