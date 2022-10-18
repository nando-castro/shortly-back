import connection from "../db/database.js";

export async function getRanking() {
  connection.query(`SELECT u."id", u."name", COUNT(l."link") AS "linksCount", COALESCE(SUM(l."views"),0) AS "visitCount"
    FROM "users" u
    LEFT JOIN "links" l
    ON u.id = l."userId"
    GROUP BY u.id
    ORDER BY "visitCount" DESC, "linksCount" DESC, u.id ASC
    LIMIT 10`);
}
