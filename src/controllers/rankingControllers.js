import connection from "../db/database.js";

export async function getRanking(req, res) {
  try {
    const { rows: users } =
     await connection.query(`SELECT u."id", u."name", COUNT(l."link") AS "linksCount", SUM(l."views") AS "visitCount" 
    FROM "links" l
    JOIN "users" u ON l."userId" = u."id"
    GROUP BY u."id"
    ORDER BY "visitCount" DESC
    LIMIT 10`);
    //const [ranking] = users;
    res.status(200).send(users)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
