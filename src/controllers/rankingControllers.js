import connection from "../db/database.js";

export async function getRanking(req, res) {
  try {
    const { rows: users } =
      await connection.query(`SELECT u."id", u."name", COUNT(l."link") AS "linksCount", COALESCE(SUM(l."views"),0) AS "visitCount"
    FROM "users" u
    LEFT JOIN "links" l
    ON u.id = l."userId"
    GROUP BY u.id
    ORDER BY "visitCount" DESC
    LIMIT 10`);

    //const [ranking] = users;
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
